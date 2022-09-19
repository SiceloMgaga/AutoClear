import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateUserReviewComponent } from './update-user-review/update-user-review.component';
import { ReviewServiceService } from './review-service.service';

@Component({
  selector: 'app-customer-reviews',
  templateUrl: './customer-reviews.component.html',
  styleUrls: ['./customer-reviews.component.scss']
})
export class CustomerReviewsComponent implements AfterViewInit {

  displayedColumns: string[] = ['name','description','date','actions'];
  dataSource!: MatTableDataSource<Review>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort ,{ static: true }) sort!: MatSort;

  username!: string;
  id!:string;

  constructor(private service: ReviewService,public dialog: MatDialog,private _snackBar: MatSnackBar, private tranferReviewId:ReviewServiceService) {
    this.getReviews();
   }


  ngAfterViewInit()
  {
    this.username = JSON.parse(localStorage.getItem('currentUser') || '{}' ).email;
    let users = JSON.parse(localStorage.getItem('users') || '{}');

    for(let x = 0; x < users.length; x++)
    {
      if(users[x].email == this.username)
      {
        this.id = users[x].id

        console.log(users[x].id)
        console.log(users[x].email)
      }
    }

    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() =>this.dataSource.sort = this.sort);
    console.log(this.dataSource);
  }

  //SUCCESS DELETION
  openSnackBar()
  {
    this._snackBar.open('Review Successfully Deleted', 'Okay',
    {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  //update MODAL
  updateDialog(id:number)
  {
    const dialogRef = this.dialog.open(UpdateUserReviewComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });

    //created a special service for it
    this.tranferReviewId.tranferId(id);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //Make it so it returns the specific customer's orders
  getReviews():void
  {
    this.service.getReviewsList().subscribe((response: any) =>
     { 
        var customerReviewsList = [];
        for(let x =0; x< response.length; x++)
        {
          if(response[x].userId == this.id)
          {
            customerReviewsList.push(response[x])
            console.log(response)
          }
        }

        console.log(response)
        this.dataSource = new MatTableDataSource(customerReviewsList)
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);
  
     });
  }

   //SEARCH
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) 
    {
      this.dataSource.paginator.firstPage();
    }
  }

  //DELETE
  deleteReview(id: number){
    this.service.deleteReview(id).subscribe( data => {
      console.log(data);
      this.getReviews();
    })
  }

}
