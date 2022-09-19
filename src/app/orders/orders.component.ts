import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { OrderServiceService } from './services/order-service.service';
import { Order } from './models/order';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewOrderComponent } from './view-order/view-order.component';
import { UserOptions } from 'jspdf-autotable';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { MessageService } from '../vendors/services/message.service';
import { VendorsServiceService } from '../vendors/services/vendors-service.service';
import { Message } from '../vendors/view-vendor/models/message';

interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements AfterViewInit{

  displayedColumns: string[] = ['orderNumber','date','quatinty', 'total','orderStatus','actions'];
  dataSource!: MatTableDataSource<Order>;

  //custom filtering
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort ,{ static: true }) sort!: MatSort;

  message!: Message;

  //constructor
  constructor(private service: OrderServiceService, public dialog: MatDialog,private _snackBar: MatSnackBar,private messageService:MessageService, public transferId: VendorsServiceService) 
  {
    this.getOrders();
  }


  ngAfterViewInit()
  {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() =>this.dataSource.sort = this.sort);
    console.log(this.dataSource);
  }

  //SUCCESS DELETION
  openSnackBar(id:number)
  {
    this.message = new Message();
    let compareOrderStatus = JSON.parse(localStorage.getItem('Orders')|| '{}');

    for(var x = 0; x < compareOrderStatus.length; x++)
    {
      if(id == compareOrderStatus[x].orderId && compareOrderStatus[x].status == "Pending")
      {  
        this.message.MessageEmailAddress = "systemops@clife.co.za";
        this.message.MessageDescription = "A user with the Full Name: " + compareOrderStatus[x].firstname + " " + compareOrderStatus[x].firstname  + " requested a refund for an order with the ID: " + compareOrderStatus[x].orderId;  
        
        this.messageService.SendMessage(this.message).subscribe(response =>{
          console.log(response)
        });

        this._snackBar.open('Request sent to system administrator', 'Okay',
        {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    }
  }

  requestRefund()
  {

  }

  //EDIT MODAL
  viewDialog(id:number)
  {
    const dialogRef = this.dialog.open(ViewOrderComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });

    this.transferId.tranferId(id);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //GET
  getOrders()
  {
    this.service.getOrdersList().subscribe((response: Order[]) =>
     { 
        console.log(response)
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator); 
        localStorage.setItem("Orders" , JSON.stringify(response));
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
    let compareOrderStatus = JSON.parse(localStorage.getItem('Orders')|| '{}');

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
        this._snackBar.open('Cannot cancel an order assigned to system functionality', 'Okay',
        {
          duration: 3000,
          verticalPosition: 'top'
        })
      }
    }

    return compareOrderStatus;
  }

  //DownloadPdf
  downloadpdf(){
    var columns = ['orderNumber','quantity','total','orderStatus'];
    const doc = new jsPDF() as jsPDFCustom;
    doc.autoTable({ columns,html: '#orders' });
    doc.save('table.pdf')
   }

}
