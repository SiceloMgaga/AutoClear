import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private service:UserService, private router:Router, private toastr:ToastrService) { }
  
  //Initialise the form
  formRegistration: FormGroup = new FormGroup({
    FullName: new FormControl("", Validators.required),
    PhoneNumber: new FormControl("", Validators.required),
    Email: new FormControl("", Validators.required),
    Passwords: this.fb.group
    ({ 
      Password: new FormControl("", [Validators.required, Validators.minLength(6)]),
     ConfirmPassword: new FormControl ("", Validators.required)
  }, { validator: this.passwordCompare })
  });

  ngOnInit(): void {

  }

  //Check if passowrds match and if they dont return error message
  passwordCompare(fb: FormGroup)
  {
    const confirmPswrdControl = fb.get('ConfirmPassword');
    if(confirmPswrdControl!.errors == null || 'passwordMismatch' in confirmPswrdControl!.errors) {
      if(fb.get('Password')!.value !== confirmPswrdControl!.value) {
        confirmPswrdControl!.setErrors({ passwordMismatch: true });
      }
      else{
        confirmPswrdControl!.setErrors(null);
      }
    }

  }

  onSubmit()
  {
    if(this.formRegistration.valid)
  {
    let newUser = new User();
    newUser.FullName = this.formRegistration.value.FullName;
    newUser.PhoneNumber = this.formRegistration.value.PhoneNumber;
    newUser.Email = this.formRegistration.value.Email;
    newUser.Password = this.formRegistration.value.Passwords.Password;
    newUser.Roles = "Customer";

    this.service.register(newUser).subscribe((res: any) =>
      {
        if(res.code == 401)
        {
          this.toastr.error(res.message)
        }
        else if(res.code == 200)
        {
          this.toastr.success('Registration Successful!');

          //redirect to login
          this.router.navigateByUrl('/user/login')
          
        }
      },
      err => 
      {
        this.toastr.error(err);
      })
  }
  else
  {
    this.toastr.error("Please enter all fields");
  }
}
}