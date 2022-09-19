import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/shared/vendor';
import { UserService } from 'src/app/shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../view-vendor/models/message';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-request-account-deletion',
  templateUrl: './request-account-deletion.component.html',
  styleUrls: ['./request-account-deletion.component.scss']
})
export class RequestAccountDeletionComponent implements OnInit {

  id!: number;
  vendor: Vendor = new Vendor();
  form!: FormGroup;
  username!:string;
  message!: Message;
  AdminNotification!: Message;

  constructor(private Service : UserService,private _snackBar: MatSnackBar,private router:  ActivatedRoute,private messageService:MessageService) { }

  ngOnInit(): void {

    this.message = new Message();
    this.AdminNotification = new Message();
    
    this.username = JSON.parse(localStorage.getItem('currentUser') || '{}' ).email;

    console.log(this.username)
    this.message.MessageEmailAddress = this.username;
  }

  Contact()
  {
    console.log(this.message.MessageEmailAddress);
    this.message.MessageDescription = "Good day, You are receiving this email because you requested for your account to be deleted.\n\n Please contact the system administrator if it's not you.";

    console.log(this.message)

    this.messageService.SendMessage(this.message).subscribe(response =>{
      console.log(response)   
    });

    this.AdminNotification.MessageEmailAddress = "systemops@clife.co.za";
    this.AdminNotification.MessageDescription = "A user with the username: " + this.username + " requests for their account to be deleted!";

    this.messageService.SendMessage(this.AdminNotification).subscribe(response =>{
      console.log(response)
    });
  }

   //SUCCESS EDIT
   openSnackBar()
   {
     this._snackBar.open('Request Sent To System Administrator!', 'Okay',
     {
       duration: 3000,
       verticalPosition: 'top',
       panelClass: ['warning']
     });
   }
}
