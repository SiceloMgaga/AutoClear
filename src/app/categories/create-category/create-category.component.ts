import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categories } from 'src/app/products/create-product/categories';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  createForm: FormGroup = new FormGroup(
    {
      Category: new FormControl("", Validators.required)
    });

  constructor(private service : UserService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  addCategory()
  {
    if(this.createForm.valid)
    {
      let newCategory = new Categories();

      newCategory.Category = this.createForm.value.Category;

    //SEND DATA TO API
    this.service.addCategory(newCategory).subscribe(response =>{
      setTimeout(() => window.location.reload());
      console.log(response)
    });
    

    //SUCCESS SNACKBAR
    this.snack.open('Successfully created Category! ', 'OK',
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
