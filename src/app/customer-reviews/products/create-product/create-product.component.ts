import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Vendor } from 'src/app/shared/vendor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Products } from 'src/app/shared/products';
import { Brands } from './brands';
import { Types } from './types';
import { Categories } from './categories';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  brands: any = []
  types: any = [];
  categories: any = [];
  image: any;
  base64Result!: any;

  //FORM VALIDATION
  createForm: FormGroup = new FormGroup(
    {
      ProductName: new FormControl("", Validators.required),
      Description: new FormControl("", Validators.required),
      Policy: new FormControl("", Validators.required),
      Commission: new FormControl("", Validators.required),
      ProductPrice: new FormControl("", Validators.required),
      ProductQuantity: new FormControl("", Validators.required),
      Brand: new FormControl("", Validators.required),
      Type: new FormControl("", Validators.required),
      Category: new FormControl("", Validators.required),
      ProductImage: new FormControl("", Validators.required)
    });
  

  constructor(private service : UserService, private snack: MatSnackBar) { 
    this.getAllBrands();
    this.getAllTypes();
    this.getAllCategories();
  }

  ngOnInit(): void {
    
  }

  getImage($event:any){
    this.image = $event.target.files[0];
    this.convertImageToBase64(this.image);
    this.image = $event.target.files[0].name;
  }

  convertImageToBase64(file: File)
  {
    const fileReader = new FileReader()
    fileReader.onloadend = (e)=>{
      this.base64Result = e.target?.result
      console.log(this.base64Result)
    };
    fileReader.readAsDataURL(file);
  } 

  addProduct()
  {
    if(this.createForm.valid)
    {
      let newProduct = new Products();

      newProduct.ProductName = this.createForm.value.ProductName;
      newProduct.Description = this.createForm.value.Description;
      newProduct.Policy = this.createForm.value.Policy;
      newProduct.Commision = this.createForm.value.Commission;
      newProduct.ProductPrice = this.createForm.value.ProductPrice;
      newProduct.ProductQuantity = this.createForm.value.ProductQuantity;
      newProduct.Brand = this.createForm.value.Brand;
      newProduct.Type = this.createForm.value.Type;
      newProduct.Category = this.createForm.value.Category;
      newProduct.ImageUrl = this.base64Result;


      //SEND DATA TO API
      this.service.addProducts(newProduct).subscribe(response =>{
        setTimeout(() => window.location.reload());
        console.log(response)
      });
      
  
      //SUCCESS SNACKBAR
      this.snack.open('Successfully created Product! ', 'OK',
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
