import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Discount } from './models/discount';
import { PromotionsServiceService } from './services/promotions-service.service';
import { EditPromotionComponent } from './edit-promotion/edit-promotion.component';
import { UserService } from '../shared/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DiscountType } from './models/discount-type';
import { Promotion } from './models/promotion';
import { Products } from '../shared/products';


@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements AfterViewInit {

  brands: any = []
  types: any = [];
  categories: any = [];
  discounts: any = [];
  discountTypes: any = [];
  products: Products = new Products();

  displayedColumns: string[] = ['productName','category','price','discount','startDate','endDate','actions'];
  dataSource!: MatTableDataSource<Promotion>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort ,{ static: true }) sort!: MatSort;


  promoForm: FormGroup = new FormGroup(
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


  constructor(private promoservice: PromotionsServiceService, public transferId: PromotionsServiceService,public dialog: MatDialog,private _snackBar: MatSnackBar,private snack: MatSnackBar,private service : UserService)
   {
    this.getDiscounts();
    this.getDiscountTpes();
    this.getAllBrands();
    this.getAllTypes();
    this.getAllCategories();
    this.getPromotions();
   }

  ngAfterViewInit()
  {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() =>this.dataSource.sort = this.sort);
    console.log(this.dataSource);

    this.service.getProducts().subscribe((response: any) =>
     { 
        console.log(response)
        this.products = response;
        localStorage.setItem("Products" , JSON.stringify(response));
     });
  }

  CreateDeals()
  {
    

    if(this.promoForm.valid)
    {

      let products = JSON.parse(localStorage.getItem('Products') || '{}');

      for(let x = 0; x < products.length; x++)
      {
        if(products[x].productName.toLowerCase() == this.promoForm.value.ProductName.toLowerCase()) //this.products.ProductName
        {

          let newPromotion = new Promotion();

          newPromotion.ProductId = products[x].productId;
          newPromotion.ProdName = this.promoForm.value.ProductName;
          newPromotion.ProdPrice = this.promoForm.value.ProductPrice;
          newPromotion.ProdBrand = this.promoForm.value.Brand;
          newPromotion.ProdType = this.promoForm.value.Type;
          newPromotion.ProdCategory = this.promoForm.value.Category;
          newPromotion.ProdDiscount = this.promoForm.value.discount;
          newPromotion.ProdDiscountType = this.promoForm.value.discountType;
          newPromotion.StartDate = this.promoForm.value.startDate;
          newPromotion.EndDate = this.promoForm.value.endDate;

          this.promoservice.CreatePromotion(newPromotion).subscribe(response =>{
            setTimeout(() => window.location.reload());
            console.log(response)
          });

          //SUCCESS SNACKBAR
          this.snack.open('New Promotion Successfully Created! ', 'OK',
          {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 4000
          });
        }
        else
        {
          this.snack.open('Sorry, Please enter valid product name!', 'OK',
          {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 4000
          });
        }
      }
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

  //EDIT MODAL
  editDialog(id:number)
  {
    const dialogRef = this.dialog.open(EditPromotionComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });

    this.transferId.tranferId(id);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //GET
  getPromotions()
  {
    this.promoservice.getPromotionsList().subscribe((response: any) =>
    { 
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);
        localStorage.setItem("Promotions" , JSON.stringify(response));
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

  //SUCCESS DELETION
  openSnackBar()
  {
    this._snackBar.open('Promotion Successfully Deleted', 'Okay',
    {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  //SEARCH
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) 
    {
      this.dataSource.paginator.firstPage();
    }
  }

  //DELETE
  deletePromotion(id: number){
    this.promoservice.deleteDiscount(id).subscribe( data => {
      console.log(data);
      this.getDiscounts();
    })
  }

}
