import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeServiceService } from '../services/type-service.service';
import { Types } from 'src/app/products/create-product/types';

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.scss']
})
export class EditTypeComponent implements OnInit {

  id!: number;
  type: Types = new Types();
  updatedTypeName!:string;

  //FORM VALIDATION
  editForm: FormGroup = new FormGroup(
  {
    TypeName: new FormControl("", Validators.required)
  });

  constructor(private Service : UserService, private snack: MatSnackBar, private typeId: TypeServiceService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.typeId.theId;
    console.log(this.id)

    this.Service.getTypeById(this.id).subscribe((data:Types) => {
      this.type = data;
    }, error => console.log(error));


    let TypesList = JSON.parse(localStorage.getItem('Types')|| '{}');

    for(var x = 0; x < TypesList.length; x++)
    {
      if(TypesList[x].productTypeId == this.id)
      {
        this.updatedTypeName = TypesList[x].typeName;

        this.editForm.patchValue(
        {
          Category: this.updatedTypeName         
        });
      }
    }
  }

  updateType()
  {
    if(this.editForm.valid)
    {
      //SEND DATA TO API
      this.Service.updateType(this.id, this.type).subscribe( data =>{
        console.log(data);
        setTimeout(() => window.location.reload());
      }
      , error => console.log(error));
  
      //SUCCESS SNACKBAR
      this.snack.open('Successfully Updated Type! ', 'OK',
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
