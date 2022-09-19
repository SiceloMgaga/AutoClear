import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { OrdersReportComponent } from './dashboard-orders/orders-report/orders-report.component';
import { SalesReportComponent } from '../sale/sales-report/sales-report.component';
import { UserOptions } from 'jspdf-autotable';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { MatDialog } from '@angular/material/dialog';
import { StatisticsReportComponent } from './statistics-report/statistics-report.component'


interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Registered Users', cols: 1, rows: 1 },
          { title: 'Products On Sale', cols: 1, rows: 1 },
          { title: 'Sales Order', cols: 1, rows: 1 },
          { title: 'Vendors', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Orders', cols: 1, rows: 1 },
          { title: 'Sales', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Registered Users', cols: 1, rows: 1 },
        { title: 'Products On Sale', cols: 1, rows: 1 },
        { title: 'Sales Order', cols: 2, rows: 2 },
        { title: 'Vendors', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Orders', cols: 1, rows: 1 },
        { title: 'Sales', cols: 2, rows: 2 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog) {}

  //ORDERS REPORT DIALOGUE
  openOrderReportDialog(){
    const dialogRef = this.dialog.open(OrdersReportComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
   }

   //SALES REPORT DIALOGUE
  openSaleReportDialog(){
    const dialogRef = this.dialog.open(SalesReportComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
   }

   openStatsDialog(){
    const dialogRef = this.dialog.open(StatisticsReportComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
   }
}
