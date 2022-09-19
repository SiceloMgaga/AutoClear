import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service: UserService, private router: Router) { 
    this.onClick();
  }

  ngOnInit(): void {
  }

  onClick()
  {
    
    this.service.deleteToken();
    //redirect to login
    this.router.navigateByUrl('/user/login')

  }
}
