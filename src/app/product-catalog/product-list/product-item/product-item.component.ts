import { Component, OnInit} from '@angular/core';
//Importing 
import { Products } from 'src/app/shared/products';
import { Input } from '@angular/core';
import { MessageService } from 'src/app/shared/message.service';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from 'src/app/wishlist/wishlist.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductIDServiceService } from './services/product-idservice.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {


product: any;

 @Input() productItem! : any
 

constructor(private message : MessageService, private route: ActivatedRoute, private wishlistService: WishlistService,private _sanitizer: DomSanitizer, private transferId: ProductIDServiceService) {
 }

  ngOnInit() {}

  viewDetailsGetID(id:number)
  {
    //created a special service for it
    this.transferId.tranferId(id);
    
  }

  getProductId()
  {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
  
    // Find the product that correspond with the id provided in route.
    this.product.find((product: any) => product.productId === productIdFromRoute);
  }

  addToWishlist(products: Products) {
    this.wishlistService.addToWishlist(products);
    window.alert('Your product has been added to the wishlist!');
  }

AddtoCart()
{
  this.message.sendMessage(this.productItem)
}

}
