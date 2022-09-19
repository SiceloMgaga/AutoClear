import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/shared/products';
import { MessageService } from 'src/app/shared/message.service';
import { Mycartitems } from '../product-catalog/mycartitems';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Md5 } from 'ts-md5';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Order } from '../orders/models/order';
import { OrderServiceService } from '../orders/services/order-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderStatus } from '../orders/models/orderStatus';
import { SaleService } from '../sale/services/sale.service';
import { Sale } from '../sale/models/sale';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
      
    );

    cartItems: Mycartitems[] = [];
    product:any;
    cartTotal = 0;
    username!: string;
    user_id!:string;

     //Form Validation
  OrderForm: FormGroup = new FormGroup(
  { 
    FirstName: new FormControl ("" , Validators.required),
    LastName: new FormControl ("" , Validators.required),
    BillingStreet: new FormControl ("" , Validators.required),
    Town: new FormControl ("" , Validators.required),
    Postcode: new FormControl ("" , Validators.required),
    ShippingStreet: new FormControl ("" , Validators.required),
    STown: new FormControl ("" , Validators.required),
    SPostcode: new FormControl ("" , Validators.required),
    Phone: new FormControl ("" , Validators.required),
    EmailAddress: new FormControl ("" , Validators.required),
    TermsandConditions : new FormControl ("" , Validators.required)
  });

  //PAYFAST 
  onRemoteSiteUserData : Map<string, string>;
  
  constructor(private message : MessageService, private router: Router,private breakpointObserver: BreakpointObserver,private http : HttpClient,public orderService: OrderServiceService, public saleServive:SaleService)
  {
   
   this.cartItems = JSON.parse(localStorage.getItem('Product_In_Cart')|| '{}');
   let localStorageCartTotal = JSON.parse(localStorage.getItem('Product_In_Cart')|| '{}');
   console.log(localStorageCartTotal);

    var sum = 0;
    var OrderNumber = new Date().toString();
    for(let x = 0; x < localStorageCartTotal.length; x++)
    {
      sum += (localStorageCartTotal[x].price * localStorageCartTotal[x].qty);
      console.log(sum)
    }
    this.cartTotal = sum;

    //Basic information - case 2
    this.onRemoteSiteUserData = new Map<string, string>();
    this.onRemoteSiteUserData.set("merchant_id", "10000100")
    this.onRemoteSiteUserData.set("merchant_key", "46f0cd694581a")
    this.onRemoteSiteUserData.set('return_url', 'http://localhost:4200/paymentsuccessform')
    this.onRemoteSiteUserData.set('cancel_url', 'http://localhost:4200/shopping-cart')
    this.onRemoteSiteUserData.set("amount", this.cartTotal.toString())
    this.onRemoteSiteUserData.set("item_name", OrderNumber)

    //User Data - Case 1
    this.onRemoteSiteUserData.set("name_first", this.OrderForm.value.FirstName)
    this.onRemoteSiteUserData.set("name_last", this.OrderForm.value.LastName)
    this.onRemoteSiteUserData.set("email_address", this.OrderForm.value.EmailAddress)
    this.onRemoteSiteUserData.set("cell_number", this.OrderForm.value.Phone)
    this.onRemoteSiteUserData.set('payment_method', 'eft')

   }

  ngOnInit(): void 
  {
    this.message.getMessage().subscribe((product: any) =>
    {
      this.AddProductToCart(product);
    })

    this.username = JSON.parse(localStorage.getItem('currentUser') || '{}' ).email;
    let users = JSON.parse(localStorage.getItem('users') || '{}');

    for(let x = 0; x < users.length; x++)
    {
      if(users[x].email == this.username)
      {
        this.user_id = users[x].id
        console.log(users[x].id)
        console.log(users[x].email)
      }
    }
  }

  localStorageCartTotal = JSON.parse(localStorage.getItem('Product_In_Cart')|| '{}');
  idOfLastAddedOrder = this.localStorageCartTotal[0].id; 

  captureOrder()
  {

    var sum = 0;
    var OrderQuantity = 0;
    for(let x = 0; x < this.localStorageCartTotal.length; x++)
    {
      sum += (this.localStorageCartTotal[x].price * this.localStorageCartTotal[x].qty);
      OrderQuantity += this.localStorageCartTotal[x].qty;
    }

    let newOrder = new Order();
    let newOrderStatus = new OrderStatus();
    newOrder.Date = new Date();
    newOrder.UserId = this.user_id;
    newOrder.FirstName = this.OrderForm.value.FirstName;
    newOrder.LastName = this.OrderForm.value.LastName;
    newOrder.BillingAddress = this.OrderForm.value.BillingAddress + " " + this.OrderForm.value.Town + " " + this.OrderForm.value.Postcode;
    newOrder.ShippingAddress = this.OrderForm.value.ShippingAddress + " " + this.OrderForm.value.STown + " " + this.OrderForm.value.SPostcode;;
    newOrder.Quantity = OrderQuantity;
    newOrder.Status = "Pending";
    newOrder.Total = sum;
    newOrderStatus.OrderStatusId = 1;
    newOrder.OrderStatusId = newOrderStatus.OrderStatusId;
  
    console.log(newOrder);

    this.orderService.CreateOrder(newOrder).subscribe(response =>{
      console.log(response);
    });
  }

  captureSale()
  {
    for(let x = 0; x < this.localStorageCartTotal.length; x++)
    {
      let newSale = new Sale();
      newSale.Date = new Date();
      newSale.Quantity = this.localStorageCartTotal[x].qty;
      newSale.ProductPrice = this.localStorageCartTotal[x].price;
      newSale.ProductName = this.localStorageCartTotal[x].productName;
      newSale.ProductDescription = this.localStorageCartTotal[x].description;
      newSale.Total = (newSale.Quantity * newSale.ProductPrice);

      this.saleServive.CreateSale(newSale).subscribe(response =>{ console.log(response);});
    }
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
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }
  
  getSignature(data : Map<string, string>) : string {
    let tempac = new URLSearchParams();
    data.forEach((a, c)=> {
      tempac.append(c, a)
    });
    let queryString = tempac.toString();
    console.log('This is the query string ['+queryString+']');
    let sign = Md5.hashStr(queryString);
    console.log("This is the sig = "+sign);
    return sign;
  }
}
