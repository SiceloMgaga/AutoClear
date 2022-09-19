import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandServiceService } from '../services/brand-service.service';
import { Brands } from 'src/app/products/create-product/brands';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit {

  id!: number;
  brand: Brands = new Brands();
  updatedBrandName!:string;

  //FORM VALIDATION
  editForm: FormGroup = new FormGroup(
  {
    BrandName: new FormControl("", Validators.required),
  });

  constructor(private Service : UserService, private snack: MatSnackBar, private brandId: BrandServiceService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.brandId.theId;
    console.log(this.id)

    this.Service.getBrandById(this.id).subscribe((data:Brands) => {
      this.brand = data;
    }, error => console.log(error));


    let BrandsList = JSON.parse(localStorage.getItem('Brands')|| '{}');

    for(var x = 0; x < BrandsList.length; x++)
    {
      if(BrandsList[x].productBrandId == this.id)
      {
        this.updatedBrandName = BrandsList[x].brandName;

        this.editForm.patchValue(
        {
          BrandName: this.updatedBrandName          
        });
      }
    }
  }

  
  updateBrand()
  {
    if(this.editForm.valid)
    {
      //SEND DATA TO API
      this.Service.updateBrand(this.id, this.brand).subscribe( data =>{
        console.log(data);
        setTimeout(() => window.location.reload());
      }
      , error => console.log(error));
  
      //SUCCESS SNACKBAR
      this.snack.open('Successfully Updated Brand! ', 'OK',
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
