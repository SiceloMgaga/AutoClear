import {Component, OnInit} from '@angular/core';
import { Vendor } from 'src/app/shared/vendor';
import { VendorsServiceService } from '../services/vendors-service.service';
import { UserService } from 'src/app/shared/user.service';
import { MessageService } from '../services/message.service';
import { Message } from './models/message';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.scss']
})
export class ViewVendorComponent implements OnInit {

  id!: number;
  vendor!: Vendor;
  message!: Message;
  company!:string;
  email!:string;
  phone!:number;

  messageForm: FormGroup = new FormGroup(
  {
    textMessage: new FormControl("", Validators.required),
  });

  constructor(private vendorservice: VendorsServiceService,private snack: MatSnackBar,private userservice: UserService, private messageService:MessageService) {}

  ngOnInit(): void {
    this.id = this.vendorservice.theId;

    this.vendor = new Vendor();
    this.message = new Message();

    this.userservice.getVendorById(this.id).subscribe( data => {
      this.vendor = data;
      console.log(data);
    });

    let vendorsList = JSON.parse(localStorage.getItem('Vendors')|| '{}');

    for(var x = 0; x < vendorsList.length; x++)
    {
      if(vendorsList[x].vendorId == this.id)
      {
        this.company = vendorsList[x].businessName;
        this.email = vendorsList[x].emailAddress;
        this.phone = vendorsList[x].cellphoneNumber;

        this.message.MessageEmailAddress = this.email = vendorsList[x].emailAddress;
      }
    }
  }

  Contact(){
    this.message.MessageDescription = this.messageForm.value.textMessage;
    console.log(this.message.MessageDescription)

    this.messageService.SendMessage(this.message).subscribe(response =>{
      console.log(response)
    });

    this.messageForm.reset();

    this.snack.open('Message Successfully Sent! ', 'OK',
    {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 4000
    });
    
  }

}
