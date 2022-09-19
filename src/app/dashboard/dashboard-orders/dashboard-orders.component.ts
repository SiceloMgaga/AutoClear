import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { OrderServiceService } from 'src/app/orders/services/order-service.service';
import { Order } from 'src/app/orders/models/order';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard-orders',
  templateUrl: './dashboard-orders.component.html',
  styleUrls: ['./dashboard-orders.component.scss']
})
export class DashboardOrdersComponent implements AfterViewInit {

  displayedColumns: string[] = ['orderNumber','quatinty','orderStatus','total'];
  dataSource!: MatTableDataSource<Order>;

  //custom filtering
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort ,{ static: true }) sort!: MatSort;

  //constructor
  constructor(private service: OrderServiceService) 
  {
    this.getOrders();
  }

  ngAfterViewInit()
  {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() =>this.dataSource.sort = this.sort);
    console.log(this.dataSource);
  }

  //GET
  getOrders():void
  {    
    this.service.getOrdersList().subscribe((response: Order[]) =>
     { 
        console.log(response)
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);  
     });
  }

}
