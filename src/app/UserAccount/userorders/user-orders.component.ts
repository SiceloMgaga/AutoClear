import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderServiceService } from 'src/app/orders/services/order-service.service';
import { MessageService } from 'src/app/vendors/services/message.service';
import { Order } from 'src/app/orders/models/order';
import { MatPaginator } from '@angular/material/paginator';
import { Message } from 'src/app/vendors/view-vendor/models/message';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  displayedColumns: string[] = ['orderNumber','date','quatinty', 'total','orderStatus','actions'];
  dataSource!: MatTableDataSource<Order>;

  message!: Message;
  username!: string;
  id!:string;

  //custom filtering
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort ,{ static: true }) sort!: MatSort;
 

  //constructor
  constructor(private service: OrderServiceService, public dialog: MatDialog,private _snackBar: MatSnackBar,private messageService:MessageService) 
  {
    this.getOrders();
  }

  ngOnInit(): void
  {
    this.message = new Message();
    this.username = JSON.parse(localStorage.getItem('currentUser') || '{}' ).email;
    let users = JSON.parse(localStorage.getItem('users') || '{}');

    for(let x = 0; x < users.length; x++)
    {
      if(users[x].email == this.username)
      {
        this.id = users[x].id

        console.log(users[x].id)
        console.log(users[x].email)
      }
    }

    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() =>this.dataSource.sort = this.sort);
    console.log(this.dataSource);
  }

   //SUCCESS DELETION
   openSnackBar(id:number)
   {
     let compareOrderStatus = JSON.parse(localStorage.getItem('Orders')|| '{}');
 
     for(var x = 0; x < compareOrderStatus.length; x++)
     {
       if(id == compareOrderStatus[x].orderId && compareOrderStatus[x].status == "Pending")
       {        
         this._snackBar.open('Request sent to system administrator', 'Okay',
         {
           duration: 3000,
           verticalPosition: 'top'
         });

         this.message.MessageEmailAddress = "systemops@clife.co.za";
         this.message.MessageDescription = "A user with the username: " + this.username + " has requested a refund for an order with the ID: " + id;
         //send email to admin
         this.messageService.SendMessage(this.message).subscribe(response =>{
          console.log(response)
         });
       }
     }
   }
 
   //GET
   getOrders()
   {
     this.service.getOrdersList().subscribe((response: any) =>
     { 
      console.log(response)
        localStorage.setItem("userOrders" , JSON.stringify(response));

        var customerOdersList = [];
        for(let x =0; x< response.length; x++)
        {
          if(response[x].userId == this.id)
          {
            customerOdersList.push(response[x])
            console.log(response)
          }
        }

         this.dataSource = new MatTableDataSource(customerOdersList)
         this.dataSource.sort = this.sort;
         setTimeout(() => this.dataSource.paginator = this.paginator);
      });     
   }
 
    //SEARCH
    applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
 
     if (this.dataSource.paginator) 
     {
       this.dataSource.paginator.firstPage();
     }
   }
 
   deleteOrder(id:number)
   {
     let compareOrderStatus = JSON.parse(localStorage.getItem('userOrders')|| '{}');
 
     for(var x = 0; x < compareOrderStatus.length; x++)
     {
       if(id == compareOrderStatus[x].orderId && compareOrderStatus[x].status == "Pending")
       {
         this.service.deleteOrder(id).subscribe( data => {
           console.log(data);
           this.getOrders();
         })
       }
       else
       {
         this._snackBar.open('Can only request a refund for pending orders', 'Okay',
         {
           duration: 3000,
           verticalPosition: 'top'
         })
       }
     }
 
     return compareOrderStatus;
   }

}
