import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-stats',
  templateUrl: './users-stats.component.html',
  styleUrls: ['./users-stats.component.scss']
})
export class UsersStatsComponent implements OnInit {

  constructor() { }

  count = 0;

  ngOnInit(): void {

    let ProductsList = JSON.parse(localStorage.getItem('users')|| '{}');

    for(var x = 0; x < ProductsList.length; x++)
    {
      this.count = this.count + 1;
    }
  }

}
