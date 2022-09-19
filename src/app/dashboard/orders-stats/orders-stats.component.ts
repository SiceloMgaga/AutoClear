import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-stats',
  templateUrl: './orders-stats.component.html',
  styleUrls: ['./orders-stats.component.scss']
})
export class OrdersStatsComponent implements OnInit {

  constructor() { }

  count = 0;

  ngOnInit(): void {

    let ProductsList = JSON.parse(localStorage.getItem('Orders')|| '{}');

    for(var x = 0; x < ProductsList.length; x++)
    {
      this.count = this.count + 1;
    }
  }

}
