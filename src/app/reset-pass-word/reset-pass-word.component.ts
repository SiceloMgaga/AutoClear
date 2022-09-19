import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ResetPasswordService } from './services/reset-password.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-reset-pass-word',
  templateUrl: './reset-pass-word.component.html',
  styleUrls: ['./reset-pass-word.component.css']
})
export class ResetPassWordComponent implements OnInit {

  id!: any;
  users: any;
  username!: string;

  constructor(private Service : UserService, private snack: MatSnackBar,private fb: FormBuilder, private router: Router, private passwordId: ResetPasswordService) { }

  ngOnInit(): void 
  {

    this.username = JSON.parse(localStorage.getItem('currentUser') || '{}').email;
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    console.log(this.username);

    for(let x = 0; x < users.length; x++){
      if(users[x].email == this.username)
      {
        this.id = users[x].id
        console.log(users[x].id)
        console.log(users[x].email)

        this.Service.getUserById(this.id).subscribe((response: User) => {
          console.log(response);
          localStorage.setItem("users", JSON.stringify(response))
          this.users = response;
          console.log(this.users)
        })
      }
    }
  }

  resetPassword: FormGroup = new FormGroup(
  {
    Passwords: this.fb.group(
    { 
      NewPassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
      ConfirmPassword: new FormControl ("", Validators.required)
    },
    { 
      validator: this.passwordCompare 
    })
  });

  passwordCompare(fb: FormGroup)
  {
    const confirmPswrdControl = fb.get('ConfirmPassword');
    if(confirmPswrdControl!.errors == null || 'passwordMismatch' in confirmPswrdControl!.errors) {
      if(fb.get('NewPassword')!.value !== confirmPswrdControl!.value) {
        confirmPswrdControl!.setErrors({ passwordMismatch: true });
      }
      else{
        confirmPswrdControl!.setErrors(null);
      }
    }
  }

  updatePassword()
  {
    if(this.resetPassword.valid)
    {
      //SEND DATA TO API
      console.log(this.users)
      var updatedPassword = new User();
      updatedPassword.Email = this.username;
      updatedPassword.Username = this.username;
      updatedPassword.Roles = "Customer";
      updatedPassword.FullName = this.users.fullName;
      updatedPassword.PhoneNumber = this.users.phoneNumber;
      updatedPassword.Password = this.resetPassword.value.Passwords.NewPassword;
      console.log(this.resetPassword.value.Passwords.NewPassword);
      updatedPassword.Address = this.users.address;

      console.log(updatedPassword);

      this.Service.updateUser(this.id, updatedPassword).subscribe( data =>{
        console.log(data);
        this.resetPassword.reset();
      }
      , error => console.log(error));
  
      //SUCCESS SNACKBAR
      this.snack.open('Successfully Updated Password! ', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
    }
    else
    {
      this.snack.open('Form Invalid, Please enter all fields! ', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
    }
  }
}
