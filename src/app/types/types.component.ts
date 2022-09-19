import { Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { UserService } from '../shared/user.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Types } from '../products/create-product/types';
import { TypeServiceService } from './services/type-service.service';
import { CreateTypeComponent } from './create-type/create-type.component';
import { EditTypeComponent } from './edit-type/edit-type.component';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {

  displayedColumns: string[] = ['productTypeId','typeName', 'actions'];
  dataSource!: MatTableDataSource<Types>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(ModalDirective) modal!: ModalDirective;

  constructor(private service: UserService, public dialog: MatDialog,private _snackBar: MatSnackBar, private router: Router, public transferId: TypeServiceService) {
    this.getTypes();
   }

  ngOnInit(): void {
  }

  //ADD PRODUCT MODAL
  createDialog()
  {
    const dialogRef = this.dialog.open(CreateTypeComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    this.getTypes();
  }

  //EDIT PRODUCT MODAL
  editDialog(id:number)
  {
    const dialogRef = this.dialog.open(EditTypeComponent,
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

  getTypes()
  {
    this.service.getTypes().subscribe((response: any) =>
     { 
        console.log(response)
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);
        localStorage.setItem("Types" , JSON.stringify(response));
     });
  }

  //DELETE
  deleteType(id: number){
    this.service.deleteType(id).subscribe( data => {
      console.log(data);
      this.getTypes();
    })
  }

  //SUCCESS DELETION
  openSnackBar()
  {
    this._snackBar.open('Type Successfully Deleted', 'Okay',
    {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

}
