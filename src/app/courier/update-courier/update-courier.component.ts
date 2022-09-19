import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Courier } from '../models/courier';
import { CourierType } from '../models/courier-type';
import { CourierService } from '../services/courier.service';

@Component({
  selector: 'app-update-courier',
  templateUrl: './update-courier.component.html',
  styleUrls: ['./update-courier.component.scss']
})
export class UpdateCourierComponent implements OnInit {

  constructor(private Service : CourierService, private snack: MatSnackBar,private courierID: CourierService,private router: Router) { }

  Name!:string;
  updateEmail!:string;
  updatePhone!: string; 

  id!: number;
  courier: Courier = new Courier();
  EmailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  //FORM VALIDATION
  editForm: FormGroup = new FormGroup(
  {
    courierName: new FormControl("", Validators.required),
    emailAddress: new FormControl("", [Validators.required,Validators.pattern(this.EmailPattern)]),
    phone: new FormControl("", [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]), 
  });

  ngOnInit(): void {

    // this.id = this.route.snapshot.params['id'];
    this.id = this.courierID.theId;
    console.log(this.id)

    this.Service.getCourierById(this.id).subscribe((data:Courier) => {
      this.courier = data;
    }, error => console.log(error));

    let couriersList = JSON.parse(localStorage.getItem('Couriers')|| '{}');

    for(var x = 0; x < couriersList.length; x++)
    {
      if(couriersList[x].courier_ID == this.id)
      {
        this.Name = couriersList[x].courier_Name;
        console.log(couriersList[x].courier_Name);
        this.updateEmail = couriersList[x].courier_Email;
        this.updatePhone = couriersList[x].courier_Number;

        this.editForm.patchValue(
        {
          courierName: this.Name,
          emailAddress: this.updateEmail,
          phone: this.updatePhone
        });
      }
    }
  }

   //UPDATE VENDOR
   updateCourier()
   {
     if(this.editForm.valid)
     {
        this.courier.Courier_Name = this.editForm.value.courierName;
        this.courier.Courier_Email = this.editForm.value.emailAddress;
        this.courier.Courier_Number = this.editForm.value.phone;
       //SEND DATA TO API
       this.Service.updateCourier(this.id, this.courier).subscribe( data =>{
         console.log(data);
         setTimeout(() => window.location.reload());
       }
       , error => console.log(error));
   
       //SUCCESS SNACKBAR
       this.snack.open('Successfully Updated Courier! ', 'OK',
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
