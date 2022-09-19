import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Types } from 'src/app/products/create-product/types';

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.component.html',
  styleUrls: ['./create-type.component.scss']
})
export class CreateTypeComponent implements OnInit {

  createForm: FormGroup = new FormGroup(
    {
      TypeName: new FormControl("", Validators.required)
    });

  constructor(private service : UserService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  addType()
  {
    if(this.createForm.valid)
    {
      let newType = new Types();

      newType.TypeName = this.createForm.value.TypeName;

    //SEND DATA TO API
    this.service.addType(newType).subscribe(response =>{
      setTimeout(() => window.location.reload());
      console.log(response)
    });
    

    //SUCCESS SNACKBAR
    this.snack.open('Successfully created Type! ', 'OK',
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
