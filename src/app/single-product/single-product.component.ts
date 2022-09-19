import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ReviewService } from '../reviews/review.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Review } from '../reviews/review';
import { Customer } from '../shared/customer';
import { ProductIDServiceService } from '../product-catalog/product-list/product-item/services/product-idservice.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  public form!: FormGroup;
  id!:number;
  Product_Name!:string;
  Product_Description!:string;
  Product_Price!:number;
  Product_Image!:string;
  username!: string;
  user_id!:string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private fb: FormBuilder,private Service : ReviewService, private snack: MatSnackBar,private productID: ProductIDServiceService)
  {
    this.form = this.fb.group({
      rating: ['', Validators.required],
      productReview: ['',Validators.required]
    })
  }

  ngOnInit(): void {

    this.id = this.productID.theId;
    console.log(this.id)

    let productsList = JSON.parse(localStorage.getItem('Products')|| '{}');
    console.log(productsList);
    
    for(var x = 0; x < productsList.length; x++)
    {
      if(productsList[x].productId == this.id)
      {
        console.log(productsList[x].productId);
        this.Product_Name = productsList[x].productName;
        this.Product_Description = productsList[x].description;
        this.Product_Price = productsList[x].productPrice;
        this.Product_Image = productsList[x].imageUrl;
      }
    }

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

  addReview()
  {

    if(this.form.valid)
    {
      let newReview = new Review();
      //add product model
      //let product = new Product();
      let customer = new Customer();

      newReview.Rating = this.form.value.rating;
      newReview.Description = this.form.value.productReview;
      newReview.ReviewDate = new Date();

      newReview.ProductId = this.id;
      newReview.UserId = this.user_id;
      newReview.ReviewName = this.Product_Name;

      //SEND DATA TO API
      this.Service.CreateReview(newReview).subscribe(response =>{
        setTimeout(() => window.location.reload());
        console.log(response)
      });

      //reset the form
      this.form.reset();
  
      //SUCCESS SNACKBAR
      this.snack.open('Thank you for your feedback!', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
    }
    else
    {
      this.snack.open('Rate the product and provide some feedback! ', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
    }

  }

}


