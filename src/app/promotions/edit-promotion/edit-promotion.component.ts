import { Promotion } from '../models/promotion';
import { UserService } from 'src/app/shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, AfterViewInit, ViewChild,OnInit } from '@angular/core';
import { PromotionsServiceService } from '../services/promotions-service.service';
import { Discount } from '../models/discount';
import { DiscountType } from '../models/discount-type';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.scss']
})
export class EditPromotionComponent implements OnInit {


  brands: any = []
  types: any = [];
  categories: any = [];
  discounts: any = [];
  discountTypes: any = [];
  id!: number;
  promo: Promotion = new Promotion();

   constructor(private promoservice: PromotionsServiceService, public transferId: PromotionsServiceService,public dialog: MatDialog,private _snackBar: MatSnackBar,private snack: MatSnackBar,private service : UserService)
   {
    this.getDiscounts();
    this.getDiscountTpes();
    this.getAllBrands();
    this.getAllTypes();
    this.getAllCategories();
    this.getPromotions();
   }

  editForm: FormGroup = new FormGroup(
  {
    ProductName: new FormControl("", Validators.required),
    ProductPrice: new FormControl("", Validators.required),
    Brand: new FormControl("", Validators.required),
    Type: new FormControl("", Validators.required),
    Category: new FormControl("", Validators.required),
    discount: new FormControl("", Validators.required),
    startDate: new FormControl("", Validators.required),
    endDate: new FormControl("", Validators.required),
    discountType: new FormControl("",Validators.required)
  });

  ngOnInit(): void {

    this.id = this.transferId.theId;
    console.log(this.id)

    this.promoservice.getPromotionById(this.id).subscribe((data:Promotion) => {
      this.promo = data;
    }, error => console.log(error));
  }

  updateDeal()
  {
    if(this.editForm.valid)
    {
      this.promo.ProdName = this.editForm.value.ProductName;
      this.promo.ProdPrice = this.editForm.value.ProductPrice;
      this.promo.ProdBrand = this.editForm.value.Brand;
      this.promo.ProdType = this.editForm.value.Type;
      this.promo.ProdCategory = this.editForm.value.Category;
      this.promo.ProdDiscount = this.editForm.value.discount;
      this.promo.ProdDiscountType = this.editForm.value.discountType;
      this.promo.StartDate = this.editForm.value.startDate;
      this.promo.EndDate = this.editForm.value.endDate;

      this.promoservice.updatePromotion(this.id, this.promo).subscribe( data =>{
        console.log(data);
        setTimeout(() => window.location.reload());
       }, error => console.log(error));
  
      //SUCCESS SNACKBAR
      this.snack.open('Successfully Updated Promo! ', 'OK',
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 4000
      });
    }
    else
    {
      this.snack.open('Form Invalid, Please enter all required fields! ', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
    }
  }


  //GET
  getPromotions()
  {
    this.promoservice.getPromotionsList().subscribe((response: any) =>
    { 
      console.log(response)
    });
  }

  getDiscounts()
  {
    this.promoservice.getDiscountsList().subscribe((response: any) => { this.discounts = response });
  }

  getDiscountTpes()
  {
    this.promoservice.getDiscountsTypeList().subscribe((response: any) => { this.discountTypes = response });
  }

  getAllBrands()
  {
    this.service.getBrands().subscribe((response: any) => {this.brands = response})
  }

  getAllTypes()
  {
    this.service.getTypes().subscribe((response: any) => {this.types = response})
  }

  getAllCategories()
  {
    this.service.getCategories().subscribe((response: any) => {this.categories = response})
  }

}
