import { Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { UserService } from '../shared/user.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Products } from '../shared/products';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateProductComponent } from './create-product/create-product.component';
import { Router } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductServiceService } from './services/product-service.service';
import { UserOptions } from 'jspdf-autotable';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx';

interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void;
}


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements AfterViewInit{

  displayedColumns: string[] = ['productName', 'description', 'policy','commission', 'productPrice','productQuantity','brand','type','category','actions'];
  dataSource!: MatTableDataSource<Products>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(ModalDirective) modal!: ModalDirective;

  fileName= 'ProductsSheet.xlsx';

  //constructor
  constructor(private service: UserService, public dialog: MatDialog,private _snackBar: MatSnackBar, private router: Router, public transferId: ProductServiceService) {
    this.getProducts();
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Products>();
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.dataSource.sort = this.sort;
  }

  //ADD PRODUCT MODAL
  createDialog()
  {
    const dialogRef = this.dialog.open(CreateProductComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    this.getProducts();
  }

  //EDIT PRODUCT MODAL
  editDialog(id:number)
  {
    const dialogRef = this.dialog.open(EditProductComponent,
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
  getProducts()
  {
    this.service.getProducts().subscribe((response: any) =>
     { 
        console.log(response)
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);
        localStorage.setItem("Products" , JSON.stringify(response));
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
  deleteProduct(id: number){
    this.service.deleteProduct(id).subscribe( data => {
      console.log(data);
      this.getProducts();
    })
  }

  //SUCCESS DELETION
  openSnackBar()
  {
    this._snackBar.open('Product Successfully Deleted', 'Okay',
    {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  //DownloadPdf
  downloadpdf(){
    var columns = ['productName', 'description', 'policy','commission', 'productPrice','productQuantity','brand','type','category'];
    const doc = new jsPDF() as jsPDFCustom;
    doc.autoTable({ columns,html: '#products' });
    doc.save('product.pdf')
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
