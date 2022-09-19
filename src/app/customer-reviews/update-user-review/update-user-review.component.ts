import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/reviews/review';
import { ReviewService } from 'src/app/reviews/review.service';
import { ReviewServiceService } from '../review-service.service';

@Component({
  selector: 'app-update-user-review',
  templateUrl: './update-user-review.component.html',
  styleUrls: ['./update-user-review.component.scss']
})
export class UpdateUserReviewComponent implements OnInit {

  id!: number;
  review: Review = new Review();

  UpdateReview: FormGroup = new FormGroup(
  {
    reviewName: new FormControl("", Validators.required),
    updatedDescription: new FormControl("", Validators.required),
    rating: new FormControl("", Validators.required)
  });

  constructor(private reviewservice:ReviewService,private reviewID: ReviewServiceService,private snack: MatSnackBar) { }

  ngOnInit(): void {

    this.id = this.reviewID.theId;
    console.log(this.id)

    this.reviewservice.getReviewById(this.id).subscribe((data:Review) => {
      this.review = data;
    }, error => console.log(error));
  }

  updateReview()
  {
    if(this.UpdateReview.valid)
    {
      this.review.ReviewName = this.UpdateReview.value.reviewName;
      this.review.Description = this.UpdateReview.value.updatedDescription;
      this.review.Rating = this.UpdateReview.value.rating;
      this.review.ReviewDate = new Date();
      // this.review.CustomerId = this.reviewID.theId;
      // this.review.ProductId = this.reviewID.theId;
      //SEND DATA TO API
      this.reviewservice.updateReview(this.id, this.review).subscribe( data =>{
        console.log(data);
        setTimeout(() => window.location.reload());
      }
      , error => console.log(error));
  
      //SUCCESS SNACKBAR
      this.snack.open('Review Updated! ', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
    }
    else
    {
      this.snack.open('Form Invalid, Please enter all required fields! ', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
      }
  }

}
