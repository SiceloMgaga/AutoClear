import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { UserService } from '../shared/user.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { Customer } from '../shared/customer';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditCustomerComponent } from './add-edit-customer/add-edit-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { User } from '../shared/user';
import { CustomerServiceService } from './services/customer-service.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements AfterViewInit{

  displayedColumns: string[] = ['fullName', 'email','phoneNumber','address','actions'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(ModalDirective) modal!: ModalDirective;

  id!: any;
  username!: string;

  //constructor
  constructor(private service: UserService, private transferId: CustomerServiceService, public dialog: MatDialog,private _snackBar: MatSnackBar) 
  {
    this.getAllUsers();
    this.getUsers();
  }

  ngAfterViewInit()
  {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.dataSource.sort = this.sort;
  }

  //SUCCESS DELETION
  openSnackBar()
  {
    this._snackBar.open('Customer Successfully Deleted', 'Okay',
    {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  //EDIT MODAL
  editDialog(id:any)
  {
    const dialogRef = this.dialog.open(AddEditCustomerComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });

      this.transferId.tranferId(id);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //EDIT MODAL
  viewDialog()
  {
    const dialogRef = this.dialog.open(ViewCustomerComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //GET
  getUsers()
  {
    this.service.getUsersList().subscribe((response: any) =>
    { 
      var customerList = [];
      for(let x =0; x< response.length; x++)
      {
        if(response[x].roles == "Customer")
       {
        customerList.push(response[x])
        console.log(response)
       }
      }
      this.dataSource = new MatTableDataSource(customerList)
      this.dataSource.sort = this.sort;
      setTimeout(() => this.dataSource.paginator = this.paginator);
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

getAllUsers()
{
    this.service.getUsersList().subscribe((response: any) => {
      console.log(response);
      localStorage.setItem("users", JSON.stringify(response))
      // this.users = JSON.stringify(response);
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
 }

  deleteUser()
  {
    this.service.deleteUser(this.id).subscribe((response: any) => {
      console.log(response);
  })
}

}
