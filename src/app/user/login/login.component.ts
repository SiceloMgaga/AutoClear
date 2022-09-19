import { Component, OnInit } from '@angular/core';;
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Initialise the form
  formLogin: FormGroup = new FormGroup({
    Email: new FormControl("", Validators.required),
    Password: new FormControl("", Validators.required)
  });

  //Inject in constructor
  constructor(private service:UserService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {}

  //Check error codes and return required redirects/responses
  onSubmit()
  {
    let newUser = new User();
    newUser.Email = this.formLogin.value.Email;
    newUser.Password = this.formLogin.value.Password;

    this.service.login(newUser).subscribe((res: any) =>
      {
        if(res.code == 401)
        {
          this.toastr.error(res.message)
        }
        if(res.code == 200)
        {
          localStorage.setItem('token', JSON.stringify(res.token));

          localStorage.setItem('currentUser', JSON.stringify({ email: newUser.Email, token: res.token }));
          
          console.log(newUser.Email)

          if(res.roles[0] == "Customer")
          {
            this.router.navigateByUrl('/autoclearstore')

          }
          else if(res.roles[0] == "Admin")
          {
            this.router.navigateByUrl('/admindashboard')
          }
          else if(res.roles[0] == "Vendor")
          {
            this.router.navigateByUrl('/vendordashboard')
          }
        }
      },
      err => 
      {
        this.toastr.error(err);
      })

  }

}