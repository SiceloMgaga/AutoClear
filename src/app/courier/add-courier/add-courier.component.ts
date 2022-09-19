import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourierService } from '../services/courier.service';
import { Courier } from '../models/courier';
import { CourierType } from '../models/courier-type';

@Component({
  selector: 'app-add-courier',
  templateUrl: './add-courier.component.html',
  styleUrls: ['./add-courier.component.scss']
})
export class AddCourierComponent implements OnInit {

  EmailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  //FORM VALIDATION
  createForm: FormGroup = new FormGroup(
    {
      courierName: new FormControl("", Validators.required),
      emailAddress: new FormControl("", [Validators.required,Validators.pattern(this.EmailPattern)]),
      phone: new FormControl("", [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]), 
    });
  
  constructor(private Service : CourierService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  addCourier()
  {
    if(this.createForm.valid)
    {
      let newCourier = new Courier();
      newCourier.Courier_Name = this.createForm.value.courierName;
      newCourier.Courier_Number = this.createForm.value.phone;
      newCourier.Courier_Email = this.createForm.value.emailAddress;

      //SEND DATA TO API
      this.Service.CreateCourier(newCourier).subscribe(response =>{
        setTimeout(() => window.location.reload());
        console.log(response)
      });
      
  
      //SUCCESS SNACKBAR
      this.snack.open('Successfully created Courier! ', 'OK',
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
