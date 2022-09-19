import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent {

  isUpdate:boolean = true;
  isDelete:boolean = false;
  isOrders:boolean = false;
  isReviews:boolean = false;
  isUpdatePassword: boolean = false;
  id!:any;
  username!: string;

  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private service: UserService, private router: Router) {
    this.getAllUsers();
  }

  updateAccoutRouter()
  {
    this.isUpdate = true;
    this.isDelete = false;
    this.isOrders = false;
    this.isReviews = false;
    this.isUpdatePassword = false;
  }
  
  resetPasswordRouter()
  {
    this.isUpdatePassword = true;
    this.isDelete = false;
    this.isUpdate = false;
    this.isOrders = false;
    this.isReviews = false;
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
        
        console.log(users[x].email)
      }
    }
 }

  deleteUser()
  {
    this.service.deleteUser(this.id).subscribe((response: any) => {
      console.log(response);
      this.router.navigateByUrl('/user/registration')
  })
}

  ordersRouter()
  {
    this.isOrders = true;
    this.isUpdate = false;
    this.isDelete = false;
    this.isReviews = false;
    this.isUpdatePassword = false;
  }

  reviewsRouter()
  {
    this.isReviews = true;
    this.isUpdate = false;
    this.isOrders = false;
    this.isDelete = false;
    this.isUpdatePassword = false;
  }

}
