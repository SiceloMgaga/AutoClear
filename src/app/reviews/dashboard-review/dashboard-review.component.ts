import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { Review } from '../review';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard-review',
  templateUrl: './dashboard-review.component.html',
  styleUrls: ['./dashboard-review.component.scss']
})
export class DashboardReviewComponent implements AfterViewInit {

  displayedColumns: string[] = ['name','description','date','rating'];
  dataSource!: MatTableDataSource<Review>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort ,{ static: true }) sort!: MatSort;

  //constructor
  constructor(private service: ReviewService,public dialog: MatDialog,private _snackBar: MatSnackBar) {
    this.getReviews();
   }


  ngAfterViewInit()
  {
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

  getReviews():void
  {
    this.service.getReviewsList().subscribe((response: Review[]) =>
     { 
        console.log(response)
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);
  
     });
  }
}
