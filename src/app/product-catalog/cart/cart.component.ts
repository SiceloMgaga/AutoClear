import { isNgTemplate } from '@angular/compiler';
import { Component, IterableDiffers, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/message.service';
import { Mycartitems } from '../mycartitems';
import { Router } from '@angular/router'; 
import { Products } from 'src/app/shared/products';
import { Toast } from 'ngx-toastr';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Mycartitems[] = [];
  cartTotal = 0
  product: any

  
  constructor(private message : MessageService, private router: Router) { }

  ngOnInit(): void
  {
    this.message.getMessage().subscribe((product: any) =>{ this.AddProductToCart(product)});
  }

  AddProductToCart(product: any)
  {
    let productExists = false
    for(let i in this.cartItems)
    {
      if(this.cartItems[i].id === product.productId)
      {
        this.cartItems[i].qty++
        productExists = true;
        break;
      }
      else if (this.cartItems[i].id === product.productId)
      {
        this.cartItems[i].qty
        productExists = true;
        break;
      }
    }
   
    if(!productExists)
    {
      this.cartItems.push({
        id: product.productId,
        productName: product.productName,
        qty: 1,
        price: product.productPrice,
        description: product.description
      })
    }

    this.cartTotal = 0
    this.cartItems.forEach(item => { this.cartTotal += (item.qty * item.price) })

    //Local Storage 
    localStorage.setItem("Product_In_Cart" , JSON.stringify(this.cartItems));
  }

  // //Adding more products
  IncreasingQuantity ()
  {
    let productExists = false
    for(let i in this.cartItems)
    {
        if(this.cartItems[i].id === this.product.productId)
        {
          this.cartItems[i].qty++
          productExists = true;
          break;
        }
    }
  }

   //Clear Cart Items
   emptycart: Mycartitems={id: 0, productName: "None", description:"None", qty: 0, price: 0}

   ClearCart()
   {
     this.cartItems.splice(0,this.cartItems.length);
     localStorage.setItem("Product_In_Cart", JSON.stringify("emptycart"));
   }

   //Minusing Products From Cart()
   RemoveFromCart(id:number)
   {
     if(localStorage.getItem('Product_In_Cart'))
     {
       this.cartItems = JSON.parse(localStorage.getItem('Product_In_Cart')!)
     }
     let cartItem = this.cartItems.find(cartItem => cartItem.id === id);
     console.log(cartItem);
     if(cartItem) 
     {
       let index = this.cartItems.indexOf(cartItem);
       this.cartItems.splice(index,1);
       localStorage.setItem('Product_In_Cart',JSON.stringify(this.cartItems));
     }
   
     //Recalculating Total
     this.cartTotal = 0;
     this.cartItems.forEach(item => { this.cartTotal += (item.qty * item.price)});
   }
}

