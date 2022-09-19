import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brands } from 'src/app/products/create-product/brands';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent implements OnInit {

  createForm: FormGroup = new FormGroup(
    {
      BrandName: new FormControl("", Validators.required)
    });

  constructor(private service : UserService, private snack: MatSnackBar) { 
  }

  ngOnInit(): void {
  }

  addBrand()
  {
    if(this.createForm.valid)
    {
      let newBrand = new Brands();

      newBrand.BrandName = this.createForm.value.BrandName;

    //SEND DATA TO API
    this.service.addBrands(newBrand).subscribe(response =>{
      setTimeout(() => window.location.reload());
      console.log(response)
    });
    

    //SUCCESS SNACKBAR
    this.snack.open('Successfully created Brand! ', 'OK',
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

  
}
