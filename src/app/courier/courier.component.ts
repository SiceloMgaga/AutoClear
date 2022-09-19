import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourierService } from './services/courier.service';
import { Courier } from './models/courier';
import { CourierType } from './models/courier-type';
import { Router } from '@angular/router';
import { AddCourierComponent } from './add-courier/add-courier.component';
import { UpdateCourierComponent } from './update-courier/update-courier.component';
import { UserOptions } from 'jspdf-autotable';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx';
import { AssignOrderComponent } from './assign-order/assign-order.component';

interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void;
}

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.scss']
})
export class CourierComponent implements AfterViewInit {

  displayedColumns: string[] = ['businessName','emailAddress','cellphoneNumber','actions'];
  dataSource!: MatTableDataSource<Courier>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort ,{ static: true }) sort!: MatSort;

  fileName= 'CouriersSheet.xlsx';

  //constructor
  constructor(private service: CourierService, public dialog: MatDialog,private _snackBar: MatSnackBar,private router: Router, public transferId: CourierService) 
  {
    this.getCouriers();
  }

  ngAfterViewInit()
  {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() =>this.dataSource.sort = this.sort);
    console.log(this.dataSource);
  }

  //SUCCESS DELETION
  openSnackBar()
  {
    this._snackBar.open('Courier Successfully Deleted', 'Okay',
    {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  //ADD Courier MODAL
  createDialog()
  {
    const dialogRef = this.dialog.open(AddCourierComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //EDIT Courier MODAL
  editDialog(id:number)
  {
    const dialogRef = this.dialog.open(UpdateCourierComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });

    //created a special service for it
    this.transferId.tranferId(id);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //GET
  getCouriers():void
  {
    
    this.service.getCouriersList().subscribe((response: Courier[]) =>
     { 
        console.log(response)
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);
        localStorage.setItem("Couriers" , JSON.stringify(response));
  
     });
  }

  assignOrder(id:number)
  {
    const dialogRef = this.dialog.open(AssignOrderComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });

    //created a special service for it
    this.transferId.tranferId(id);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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

  //DELETE
  deleteCourier(id: number){
    this.service.deleteCourier(id).subscribe( data => {
      console.log(data);
      this.getCouriers();
    })
  }

  //DownloadPdf
  downloadpdf(){
    var columns = ['businessName','emailAddress','cellphoneNumber'];
    const doc = new jsPDF() as jsPDFCustom;
    doc.autoTable({ columns,html: '#couriers' });
    doc.save('table.pdf')
   }

   exportexcel(): void
   {
     /* pass here the table id */
     let element = document.getElementById('products');
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
     /* save to file */  
     XLSX.writeFile(wb, this.fileName);
   }
}
