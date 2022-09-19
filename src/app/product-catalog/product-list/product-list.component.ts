import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/shared/products';
import { UserService } from 'src/app/shared/user.service';

//importing for our getproducts() methods
//import { ProductService } from 'src/app/shared/product.service';
//import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // Autoclear ProductList
  ACproductslist: Products[] = []
 

  constructor(private service: UserService ) { }

  ngOnInit(): void {
//loading the data of our products 
  this.service.getProducts().subscribe((res: any) => 
    {
      this.ACproductslist = res;
      console.log(res);
    })
  }

}
