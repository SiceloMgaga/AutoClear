import { Component, OnInit } from '@angular/core';
import { OrderStatus } from '../models/orderStatus';
import { Order } from '../models/order';
import { OrderServiceService } from '../services/order-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VendorsServiceService } from 'src/app/vendors/services/vendors-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  statuses: any = []
  id!: number;
  order!: Order;
  customerName!: string;
  Billing!: string;
  Shipping!: string;
  currentOrderStatus: any;
  First!:string;
  Last!: string;
  StatusId!:number 
  Date!:Date;
  Quant!:number;
  Tot!:number;
  customerId!: any

    editForm: FormGroup = new FormGroup(
    {
      orderStatus: new FormControl("", Validators.required)
    });

  constructor(private service : OrderServiceService, private snack: MatSnackBar,private vendorservice: VendorsServiceService) {
    this.getOrderStatus();
   }

  ngOnInit(): void {

    this.id = this.vendorservice.theId;

    this.service.getOrderById(this.id).subscribe( data => {
      this.order = data;
      console.log(data);
    });

    //this.order.OrderStatusId

    let OrdersList = JSON.parse(localStorage.getItem('Orders')|| '{}');

    for(var x = 0; x < OrdersList.length; x++)
    {
      if(OrdersList[x].orderId == this.id)
      {
        this.customerName = OrdersList[x].firstName + " " + OrdersList[x].lastName;
        this.Billing = OrdersList[x].billingAddress;
        this.Shipping = OrdersList[x].shippingAddress;
        this.currentOrderStatus = OrdersList[x].status;
        this.First = OrdersList[x].firstName;
        this.Last = OrdersList[x].lastName;
        this.Date = OrdersList[x].date;
        this.Quant = OrdersList[x].quantity;
        this.Tot = OrdersList[x].total;
        this.customerId = OrdersList[x].userId;

      }

      this.editForm.patchValue({orderStatus: this.currentOrderStatus});
    }

  }

  date = new Date().toDateString();

  getOrderStatus(){
    this.service.getOrderStatusList().subscribe((response: any) => {this.statuses = response})
  }

  updateStatus()
  {
      if(this.editForm.valid)
      {
        let updateOrder = new Order();
        updateOrder.Status = this.editForm.value.orderStatus;
        updateOrder.BillingAddress = this.Billing;
        updateOrder.ShippingAddress = this.Shipping;
        updateOrder.FirstName = this.First;
        updateOrder.LastName = this.Last;
        updateOrder.Date = this.Date;
        updateOrder.Quantity = this.Quant;
        updateOrder.Total = this.Tot;
        updateOrder.UserId = this.customerId;
        updateOrder.OrderId = this.id;
        console.log(this.editForm.value.orderStatus)

        if(this.editForm.value.orderStatus == "Pending")
        {
            this.StatusId = 1
            updateOrder.OrderStatusId = this.StatusId
        }
        else if(this.editForm.value.orderStatus == "Collected")
        {
          this.StatusId = 2
          updateOrder.OrderStatusId = this.StatusId
        }
        else
        {
          this.StatusId = 3
          updateOrder.OrderStatusId = this.StatusId
        }


        this.service.updateOrder(this.id,updateOrder).subscribe( res => {
          console.log(res);
          setTimeout(() => window.location.reload());
        })

         //SUCCESS SNACKBAR
    this.snack.open('Successfully updated! ', 'OK',
    {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 4000
    });
      }
  }
}
