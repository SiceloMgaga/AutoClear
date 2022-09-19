import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Products } from 'src/app/shared/products';
import { PromotionsServiceService } from '../services/promotions-service.service';
import { WishlistService } from 'src/app/wishlist/wishlist.service';
import { ProductIDServiceService } from 'src/app/product-catalog/product-list/product-item/services/product-idservice.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/shared/message.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-on-sale',
  templateUrl: './on-sale.component.html',
  styleUrls: ['./on-sale.component.scss']
})
export class OnSaleComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


 product: any;

 @Input() productItem! : any

  promotions: any = [];
  id!:number;
  Product_Name!:string;
  Product_Description!:string;
  Product_Price!:number;
  Product_Image!:string;


  constructor(private breakpointObserver: BreakpointObserver,private message : MessageService,private userservice: UserService,private route: ActivatedRoute, private promotionservice: PromotionsServiceService,private wishlistService: WishlistService,private transferId: ProductIDServiceService)
  {
    this.getProducts();
    this.getPromotions();
  }

  ngOnInit(): void {
    let productsList = JSON.parse(localStorage.getItem('Products')|| '{}');
    console.log(productsList);

    for(var x = 0; x < productsList.length; x++)
    {
      if(productsList[x].productName.toLowerCase() == this.promotions[x].productName.toLowerCase() && productsList[x].productId == this.promotions[x].productId)
      {
        this.id = productsList[x].productId;
        this.Product_Name = productsList[x].productName;
        this.Product_Description = productsList[x].description;
        this.Product_Price = productsList[x].productPrice;
        this.Product_Image = productsList[x].imageUrl;
      }
    }
  }

  getProducts()
  {
    this.userservice.getProducts().subscribe((response: any) =>
    { 
      console.log(response)
    });
  }

  getPromotions()
  {
    this.promotionservice.getPromotionsList().subscribe((response: any) =>
    { 
      this.promotions = response;
      console.log(response)
    });
  }

  viewDetailsGetID(id:number)
  {
    //created a special service for it
    this.transferId.tranferId(id);
  }

  // getProductId()
  // {
  //   // First get the product id from the current route.
  //   const routeParams = this.route.snapshot.paramMap;
  //   const productIdFromRoute = Number(routeParams.get('productId'));
  
  //   // Find the product that correspond with the id provided in route.
  //   this.product.find((product: any) => product.productId === productIdFromRoute);
  // }

  addToWishlist(promotions: Products) {
    this.wishlistService.addToWishlist(promotions);
    window.alert('Your product has been added to the wishlist!');
  }

AddtoCart()
{
  this.message.sendMessage(this.promotions)
}

}
