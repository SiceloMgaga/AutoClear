import { Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { UserService } from '../shared/user.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Categories } from '../products/create-product/categories';
import { CategoryServiceService } from './services/category-service.service';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  displayedColumns: string[] = ['productCategoryId','category', 'actions'];
  dataSource!: MatTableDataSource<Categories>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(ModalDirective) modal!: ModalDirective;

  constructor(private service: UserService, public dialog: MatDialog,private _snackBar: MatSnackBar, private router: Router, public transferId: CategoryServiceService) { 
    this.getCategories();
  }

  ngOnInit(): void {
  }

  //ADD PRODUCT MODAL
  createDialog()
  {
    const dialogRef = this.dialog.open(CreateCategoryComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    this.getCategories();
  }

  //EDIT PRODUCT MODAL
  editDialog(id:number)
  {
    const dialogRef = this.dialog.open(EditCategoryComponent,
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

  getCategories()
  {
    this.service.getCategories().subscribe((response: any) =>
     { 
        console.log(response)
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);
        localStorage.setItem("Categories" , JSON.stringify(response));
     });
  }

  //DELETE
  deleteCategory(id: number){
    this.service.deleteCategory(id).subscribe( data => {
      console.log(data);
      this.getCategories();
    })
  }

  //SUCCESS DELETION
  openSnackBar()
  {
    this._snackBar.open('Category Successfully Deleted', 'Okay',
    {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
