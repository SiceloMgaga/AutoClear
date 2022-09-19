import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendors-stats',
  templateUrl: './vendors-stats.component.html',
  styleUrls: ['./vendors-stats.component.scss']
})
export class VendorsStatsComponent implements OnInit {

  constructor() { }

  count = 0;

  ngOnInit(): void {

    let ProductsList = JSON.parse(localStorage.getItem('Vendors')|| '{}');

    for(var x = 0; x < ProductsList.length; x++)
    {
      this.count = this.count + 1;
    }
  }

}
