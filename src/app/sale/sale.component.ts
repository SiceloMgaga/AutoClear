import { Component, OnInit,OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Sale } from './models/sale';
import { SaleService } from './services/sale.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements AfterViewInit {

  displayedColumns: string[] = ['productName','productDescription','date','quantity','productPrice','total'];
  dataSource!: MatTableDataSource<Sale>;

  //custom filtering
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort ,{ static: true }) sort!: MatSort;

  //constructor
  constructor(private service: SaleService, public dialog: MatDialog,private _snackBar: MatSnackBar) 
  {
    this.getSales();
  }


  ngAfterViewInit()
  {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() =>this.dataSource.sort = this.sort);
    console.log(this.dataSource);
  }

  getSales()
  {
    this.service.getSalesList().subscribe((response: Sale[]) =>
     { 
        console.log(response)
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator); 
        localStorage.setItem("Sales" , JSON.stringify(response));
     });     
  }

}




