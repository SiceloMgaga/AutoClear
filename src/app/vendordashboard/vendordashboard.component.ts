import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-vendordashboard',
  templateUrl: './vendordashboard.component.html',
  styleUrls: ['./vendordashboard.component.scss']
})
export class VendordashboardComponent {

  isProducts:boolean = true;
  isDelete:boolean = false;
  isOrders:boolean = false;
  isCourier:boolean = false;
  isBrands:boolean = false;
  isTypes:boolean = false;
  isCategory:boolean = false;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  deleteAccoutRouter()
  {
    this.isDelete = true;
    this.isProducts = false;
    this.isOrders = false;
    this.isCourier = false;
    this.isBrands = false;
    this.isTypes = false;
    this.isCategory = false;
  }

  CourierRouter()
  {
    this.isCourier = true;
    this.isProducts = false;
    this.isOrders = false;
    this.isDelete = false;
    this.isBrands = false;
    this.isTypes = false;
    this.isCategory = false;
  }

  ordersRouter()
  {
    this.isOrders = true;
    this.isProducts = false;
    this.isDelete = false;
    this.isCourier = false;
    this.isBrands = false;
    this.isTypes = false;
    this.isCategory = false;
  }

  ProductsRouter()
  {
    this.isProducts = true;
    this.isOrders = false;
    this.isDelete = false;
    this.isCourier = false;
    this.isBrands = false;
    this.isTypes = false;
    this.isCategory = false;
  }

  isBrandsRouter()
  {
    this.isBrands = true;
    this.isProducts = false;
    this.isOrders = false;
    this.isDelete = false;
    this.isCourier = false;
    this.isTypes = false;
    this.isCategory = false;
  }

  isTypesRouter()
  {
    this.isTypes = true;
    this.isProducts = false;
    this.isOrders = false;
    this.isDelete = false;
    this.isCourier = false;
    this.isBrands = false;
    this.isCategory = false;
  }

  isCategories()
  {
    this.isCategory = true;
    this.isProducts = false;
    this.isOrders = false;
    this.isDelete = false;
    this.isCourier = false;
    this.isBrands = false;
    this.isTypes = false;
  }

}
