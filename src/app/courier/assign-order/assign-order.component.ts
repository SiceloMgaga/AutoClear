import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Order } from 'src/app/orders/models/order';
import { OrderServiceService } from 'src/app/orders/services/order-service.service';
import { Courier } from '../models/courier';
import { CourierService } from '../services/courier.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/vendors/view-vendor/models/message';
import { MessageService } from 'src/app/vendors/services/message.service';

@Component({
  selector: 'app-assign-order',
  templateUrl: './assign-order.component.html',
  styleUrls: ['./assign-order.component.scss']
})
export class AssignOrderComponent implements OnInit {

  id!: number;
  courier: Courier = new Courier();
  order: any;
  message!: Message;
  PendingOrdersList: any [] = [];
  AssignedOrder!: any;
  orderList! : any;
  email: any;

  constructor(private Service : CourierService,
     private snack: MatSnackBar,
     private courierID: CourierService,
     private service: OrderServiceService,
     private router: Router,
     private messageService:MessageService) { }

     optionFormGroup: FormGroup = new FormGroup(
    {
      options: new FormControl("", Validators.required)
    });

  ngOnInit(): void {

    this.id = this.courierID.theId;
    console.log(this.id)
    this.message = new Message();

    this.Service.getCourierById(this.id).subscribe((data:any) => {
      this.courier = data;
      this.email = data.courier_Email
      this.message.MessageEmailAddress = this.email;
    }, error => console.log(error));


    this.service.getOrdersList().subscribe((response: any) =>
     { 
        console.log(response)
        this.orderList = response;

        for(let x = 0; x < response.length; x++)
        {
          if(response[x].status == "Pending")
          {
            this.PendingOrdersList.push(response[x].orderId)
          }
        }
     });  
  }

  getOrder()
  {
    console.log(this.optionFormGroup.value.options)

    for(let x = 0; x < this.PendingOrdersList.length; x++)
    {
      console.log(this.orderList[x].orderId)
      if(this.optionFormGroup.value.options == this.orderList[x].orderId)
      {
        
        this.message.MessageDescription = "You have been assigned an order with the id: " + this.optionFormGroup.value.options + " ,Delivery Times 08:00 AM - 04:00 PM Monday-Saturday";

        this.messageService.SendMessage(this.message).subscribe(response =>{
          console.log(response)
        });
        this.PendingOrdersList.splice(x);
      }
    }
  }

}
