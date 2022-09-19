import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //Products List 
  products: Product[] = 
  [
    //Populate products fom an API

    new Product (1, 'BMW M4 V8 Engine i21', 'An engine, or motor, is a machine used to change energy into movement that can be used', 150000),
    new Product (2, 'BMW M4 V8 Engine i21', 'An engine, or motor, is a machine used to change energy into movement that can be used', 200000),
    new Product (3, 'BMW M4 V8 Engine i21', 'An engine, or motor, is a machine used to change energy into movement that can be used', 5000),
    new Product (4, 'BMW M4 V8 Engine i21', 'An engine, or motor, is a machine used to change energy into movement that can be used', 100000),
    new Product (5, 'BMW M4 V8 Engine i21', 'An engine, or motor, is a machine used to change energy into movement that can be used', 50000),
    new Product (6, 'BMW M4 V8 Engine i21', 'An engine, or motor, is a machine used to change energy into movement that can be used', 55000),
    new Product (7, 'BMW M4 V8 Engine i21', 'An engine, or motor, is a machine used to change energy into movement that can be used', 5500),
    new Product (8, 'BMW M4 V8 Engine i21', 'An engine, or motor, is a machine used to change energy into movement that can be used', 5500)
  ]

  

  constructor() { }



  //Get products method


getProducts() :Product[] 
{
  //Populate products fom an API and return an obeservable

return this.products
}
}


