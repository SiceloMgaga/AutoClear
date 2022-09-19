import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {

  id!: any;
  username!: string;

  constructor(private _snackBar: MatSnackBar, private service: UserService, private router: Router) {
    this.getAllUsers();
    this.deleteUser();
   }

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('currentUser') || '{}').email;
    console.log(this.username);
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
      this.router.navigateByUrl('/user/registration')
   });
 } 

}

