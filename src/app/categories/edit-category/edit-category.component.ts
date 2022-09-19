import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from '../services/category-service.service';
import { Categories } from 'src/app/products/create-product/categories';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  id!: number;
  category: Categories = new Categories();
  updatedCatName!:string;

  //FORM VALIDATION
  editForm: FormGroup = new FormGroup(
    {
      Category: new FormControl("", Validators.required),
    });

  constructor(private Service : UserService, private snack: MatSnackBar, private categoryId: CategoryServiceService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.categoryId.theId;
    console.log(this.id)

    this.Service.getCategoryById(this.id).subscribe((data:Categories) => {
      this.category = data;
    }, error => console.log(error));

    let CategoriesList = JSON.parse(localStorage.getItem('Categories')|| '{}');

    for(var x = 0; x < CategoriesList.length; x++)
    {
      if(CategoriesList[x].productCategoryId == this.id)
      {
        this.updatedCatName = CategoriesList[x].category;

        this.editForm.patchValue(
        {
          Category: this.updatedCatName          
        });
      }
    }
  }

  updateCategory()
  {
    if(this.editForm.valid)
    {
      //SEND DATA TO API
      this.Service.updateCategory(this.id, this.category).subscribe( data =>{
        console.log(data);
        setTimeout(() => window.location.reload());
      }
      , error => console.log(error));
  
      //SUCCESS SNACKBAR
      this.snack.open('Successfully Updated Category! ', 'OK',
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
