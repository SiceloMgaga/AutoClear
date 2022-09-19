import { Injectable } from '@angular/core';
import { Products } from '../shared/products';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  items: any [] = [];

  constructor() { }

  addToWishlist(products: Products) {
    this.items.push(products);
  }

  getItems() {
    return this.items;
  }
}
