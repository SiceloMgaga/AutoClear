import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Products } from 'src/app/shared/products';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  id!: number;
  product: Products = new Products();
  brands: any = []
  types: any = [];
  categories: any = [];
  UpdateproductName!: string;
  Updatedescription!: string;
  Updatepolicy!: string;
  Updatecommision!: number;
  UpdateproductPrice!: number;
  UpdateproductQuantity!: number;
  Updatebrand!: string;
  Updatetype!: string;
  Updatecategory!: string;

  constructor(private Service : UserService, private snack: MatSnackBar, private productId: ProductServiceService,private router: Router) {
    this.getAllBrands();
    this.getAllTypes();
    this.getAllCategories();
   }

  ngOnInit(){
    this.id = this.productId.theId;
    console.log(this.id)

    this.Service.getProductById(this.id).subscribe((data:Products) => {
      this.product = data;
      console.log(data);
    }, error => console.log(error));

    
    let ProductsList = JSON.parse(localStorage.getItem('Products')|| '{}');

    for(var x = 0; x < ProductsList.length; x++)
    {
      if(ProductsList[x].productId == this.id)
      {
        this.UpdateproductName = ProductsList[x].productName;
        this.Updatedescription = ProductsList[x].description;
        this.Updatepolicy = ProductsList[x].policy;
        this.Updatecommision = ProductsList[x].commision;
        this.UpdateproductPrice = ProductsList[x].productPrice;
        this.UpdateproductQuantity = ProductsList[x].productQuantity;
        this.Updatebrand = ProductsList[x].brand;
        this.Updatecategory = ProductsList[x].category;
        this.Updatetype = ProductsList[x].type;
      }

      this.editForm.patchValue(
      {
        ProductName: this.UpdateproductName,
        Description: this.Updatedescription,
        Policy: this.Updatepolicy,
        Commission: this.Updatecommision,  
        ProductPrice: this.UpdateproductPrice, 
        ProductQuantity: this.UpdateproductQuantity,
        Brand: this.Updatebrand,
        Type: this.Updatetype ,
        Category: this.Updatecategory
      });
    }
 }


//FORM VALIDATION
editForm: FormGroup = new FormGroup(
{
    ProductName: new FormControl("", Validators.required),
    Description: new FormControl("", Validators.required),
    Policy: new FormControl("", Validators.required),
    Commission: new FormControl("", Validators.required),
    ProductPrice: new FormControl("", Validators.required),
    ProductQuantity: new FormControl("", Validators.required),
    Brand: new FormControl("", Validators.required),
    Type: new FormControl("", Validators.required),
    Category: new FormControl("", Validators.required)
  });

  //UPDATE Product
  updateProduct()
  {
    if(this.editForm.valid)
    {
      //SEND DATA TO API
      this.product.ProductName = this.editForm.value.ProductName;
      this.product.Description = this.editForm.value.Description;
      this.product.Commision = this.editForm.value.Commission;
      this.product.ProductQuantity = this.editForm.value.ProductQuantity;
      this.product.ProductPrice = this.editForm.value.ProductPrice;
      this.product.Type = this.editForm.value.Type;
      this.product.Category = this.editForm.value.Category;
      this.product.Brand = this.editForm.value.Brand;

      this.Service.updateProducts(this.id, this.product).subscribe( data =>{
        console.log(data);
        setTimeout(() => window.location.reload());
      }
      , error => console.log(error));
  
      //SUCCESS SNACKBAR
      this.snack.open('Successfully Updated Product! ', 'OK',
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

  getAllBrands()
  {
    this.Service.getBrands().subscribe((response: any) => {this.brands = response})
  }

  getAllTypes()
  {
    this.Service.getTypes().subscribe((response: any) => {this.types = response})
  }

  getAllCategories()
  {
    this.Service.getCategories().subscribe((response: any) => {this.categories = response})
  }

}
