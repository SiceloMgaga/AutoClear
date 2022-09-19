import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  insertForm : FormGroup = new FormGroup({
    Email: new FormControl("", Validators.required)
  });

  constructor(private service: UserService, fb: FormBuilder, private toasterService: ToastrService) { }


  onSubmit()
  {
    let suppliedEmail = this.insertForm.value.Email;
    let newUser = new User();
    newUser.Email = suppliedEmail;
    
    this.service.ResetPassword(newUser).subscribe((res: any) =>{
      console.log(res);
    })
  }

}
