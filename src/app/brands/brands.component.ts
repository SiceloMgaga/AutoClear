import { Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { UserService } from '../shared/user.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Brands } from '../products/create-product/brands';
import { CreateBrandComponent } from './create-brand/create-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { BrandServiceService } from './services/brand-service.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  displayedColumns: string[] = ['productBrandId','brandName', 'actions'];
  dataSource!: MatTableDataSource<Brands>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(ModalDirective) modal!: ModalDirective;

  constructor(private service: UserService, public dialog: MatDialog,private _snackBar: MatSnackBar, private router: Router, public transferId: BrandServiceService) {
    this.getBrands();
   }

  ngOnInit(): void {}

  //ADD PRODUCT MODAL
  createDialog()
  {
    const dialogRef = this.dialog.open(CreateBrandComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    this.getBrands();
  }

  //EDIT PRODUCT MODAL
  editDialog(id:number)
  {
    const dialogRef = this.dialog.open(EditBrandComponent,
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

  getBrands()
  {
    this.service.getBrands().subscribe((response: any) =>
     { 
        console.log(response)
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);
        localStorage.setItem("Brands" , JSON.stringify(response));
     });
  }

  //DELETE
  deleteBrand(id: number){
    this.service.deleteBrand(id).subscribe( data => {
      console.log(data);
      this.getBrands();
    })
  }

  //SUCCESS DELETION
  openSnackBar()
  {
    this._snackBar.open('Brand Successfully Deleted', 'Okay',
    {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
