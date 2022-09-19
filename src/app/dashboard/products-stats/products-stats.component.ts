import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-stats',
  templateUrl: './products-stats.component.html',
  styleUrls: ['./products-stats.component.scss']
})
export class ProductsStatsComponent implements OnInit {

  constructor() { }

  count = 0;
  

  ngOnInit(): void 
  {
    let ProductsList = JSON.parse(localStorage.getItem('Products')|| '{}');

    for(var x = 0; x < ProductsList.length; x++)
    {
      this.count = this.count + 1;
    }
  }

}
