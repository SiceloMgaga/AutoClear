import { Component, OnInit } from '@angular/core';
import { Products } from '../shared/products';
import { WishlistService } from './wishlist.service';
import { MatCard } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  items = this.wishlistService.getItems();

  constructor(private wishlistService: WishlistService,private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

  removefromWishlist(id:any){
    const index: number = this.items.indexOf(id);
    if (index !== -1) {
        this.items.splice(index, 1);
        window.alert('Your product has been removed to the wishlist!');
    }
  }
    
    clearWishlist(){
      this.items = [];
      window.alert("All items in wishlist have been cleared")
      return this.items;
     
    }

}
