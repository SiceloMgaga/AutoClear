import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Products } from '../shared/products';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { RoleServiceService } from './services/role-service.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class RolesComponent implements OnInit {

  displayedColumns: string[] = ['fullName', 'email','phoneNumber','address','roles','actions'];
  dataSource!: MatTableDataSource<User>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(ModalDirective) modal!: ModalDirective;


  id!: any;
  username!: string;

  //constructor
  constructor(private service: UserService, public dialog: MatDialog,private _snackBar: MatSnackBar, private router: Router, public transferId: RoleServiceService) {
    this.getAllUsers();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit()
  {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.dataSource.sort = this.sort;
  }


  //EDIT PRODUCT MODAL
  editDialog(id:any)
  {
    const dialogRef = this.dialog.open(EditRoleComponent,
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
  getAllUsers()
{
    this.service.getUsersList().subscribe((response: any) => {
      console.log(response);
      localStorage.setItem("users", JSON.stringify(response))
      //this.users = JSON.stringify(response);
    })

    this.username = JSON.parse(localStorage.getItem('currentUser') || '{}').email;
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    // console.log(this.username);
    // this.id = this.users.UserId;

    for(let x = 0; x < users.length; x++){
      if(users[x].email == this.username){
        this.id = users[x].id
        console.log(users[x].id)
        console.log(users[x].email)
      }
    }

    this.dataSource = new MatTableDataSource(users)
      this.dataSource.sort = this.sort;
      setTimeout(() => this.dataSource.paginator = this.paginator);
 }
}
