import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Vendor } from '../shared/vendor';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditVendorComponent } from './edit-vendor/add-edit-vendor.component';
import { Router } from '@angular/router';
import { VendorsServiceService } from './services/vendors-service.service';
import { CreateVendorComponent } from './create-vendor/create-vendor.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { UserOptions } from 'jspdf-autotable';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx';

interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void;
}

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements AfterViewInit{

  fileName= 'VendorsSheet.xlsx';

  displayedColumns: string[] = ['businessName','emailAddress', 'commission','cellphoneNumber','vendorAddress_Line1','vatReg','actions'];
  dataSource!: MatTableDataSource<Vendor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort ,{ static: true }) sort!: MatSort;

  //constructor
  constructor(private service: UserService, public dialog: MatDialog,private _snackBar: MatSnackBar,private router: Router, public transferId: VendorsServiceService) 
  {
    this.getVendors();
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
    this._snackBar.open('Vendor Successfully Deleted', 'Okay',
    {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  //ADD VENDOR MODAL
  createDialog()
  {
    const dialogRef = this.dialog.open(CreateVendorComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //EDIT VENDOR MODAL
  editDialog(id:number)
  {
    const dialogRef = this.dialog.open(AddEditVendorComponent,
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

  //VIEW VENDOR MODAL
  viewDialog(id:number)
  {
    const dialogRef = this.dialog.open(ViewVendorComponent,
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
  getVendors():void
  {
    
    this.service.getVendorsList().subscribe((response: Vendor[]) =>
     { 
        console.log(response)
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);
        localStorage.setItem("Vendors" , JSON.stringify(response));
  
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
  deleteVendor(id: number){
    this.service.deleteVendor(id).subscribe( data => {
      console.log(data);
      this.getVendors();
    })
  }

  //DownloadPdf
  downloadpdf(){
    var columns = ['businessName','emailAddress','commission','cellphoneNumber','vatReg'];
    const doc = new jsPDF() as jsPDFCustom;
    doc.autoTable({ columns,html: '#vendors' });
    doc.save('table.pdf')
   }

  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('vendors');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }
  
}
