import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/user';
import { UserService } from 'src/app/shared/user.service';
import { CustomerServiceService } from '../services/customer-service.service';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss']
})
export class AddEditCustomerComponent implements OnInit {

  id!: any;
  users: User = new User();
  username!: string;
  updateFullName!:string;
  updateEmail!:string;
  updatePhone!:string;
  updateAddress!:string

  constructor(private Service : UserService, private snack: MatSnackBar, private router: Router, private customerId: CustomerServiceService) { }

  //FORM VALIDATION
editForm: FormGroup = new FormGroup(
  {
      FullName: new FormControl("", Validators.required),
      Email: new FormControl("", Validators.required),
      PhoneNumber: new FormControl("", Validators.required),
      Address: new FormControl("", Validators.required)
    });

  ngOnInit(): void {

    this.id = this.customerId.theId;
    console.log(this.id)
    this.Service.getUserById(this.id).subscribe((response: User) => {
      console.log(response);
      //localStorage.setItem("users", JSON.stringify(response))
      this.users = response;
      console.log('this is users');
      console.log(this.users)
    })

    this.username = JSON.parse(localStorage.getItem('currentUser') || '{}').email;
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    // console.log(this.username);
    // this.id = this.users.UserId;

    for(let x = 0; x < users.length; x++)
    {
      if(users[x].email == this.username)
      {
        this.id = users[x].id
        console.log(users[x].id)
        console.log(users[x].email)
      }
    }

    for(let x = 0; x < users.length; x++)
    {
      if(users[x].id == this.id)
      {
        this.updateFullName = users[x].fullName;
        this.updateEmail = users[x].email;
        this.updatePhone = users[x].phoneNumber;
        this.updateAddress = users[x].address;

        this.editForm.patchValue(
        {
          FullName: this.updateFullName,
          Email: this.updateEmail,
          PhoneNumber: this.updatePhone,
          Address: this.updateAddress,
        });
      }

      
    }

  }

  //UPDATE
  updateCustomer()
  {
    if(this.editForm.valid)
    {
      //SEND DATA TO API
      console.log(this.users)
      var updatedUser = new User();
      updatedUser.UserId = this.id;
      updatedUser.Email = this.editForm.value.Email;
      updatedUser.FullName = this.editForm.value.FullName;
      updatedUser.PhoneNumber = this.editForm.value.PhoneNumber;
      updatedUser.Address = this.editForm.value.Address;

      console.log(updatedUser);

      this.Service.updateUser(updatedUser.UserId, updatedUser).subscribe( data =>{
        console.log(data);
        setTimeout(() => window.location.reload());
      }
      , error => console.log(error));
  
      //SUCCESS SNACKBAR
      this.snack.open('Successfully Updated Customer! ', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
    }
    else
    {
      this.snack.open('Form Invalid, Please enter all required fields! ', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
    }
  }
  
}
