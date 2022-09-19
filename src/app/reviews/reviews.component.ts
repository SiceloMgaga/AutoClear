import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ReviewService } from './review.service';
import { Review } from './review';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewReviewComponent } from './view-review/view-review.component';
import { ReviewsReportComponent } from './reviews-report/reviews-report.component';
import { UserOptions } from 'jspdf-autotable';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void;
}

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements AfterViewInit {

  displayedColumns: string[] = ['name','description','date','rating','actions'];
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

  //VIEW MODAL
  viewDialog()
  {
    const dialogRef = this.dialog.open(ViewReviewComponent,
      {
        disableClose: true,
        autoFocus: true,
        panelClass: 'my-custom-panel'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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

  //DownloadPdf
  downloadpdf(){
  var columns = ['name','description','rating','date'];
  const doc = new jsPDF() as jsPDFCustom;
  doc.autoTable({ columns,html: '#reviews' });
  doc.save('table.pdf')
 }

 //ORDERS REPORT DIALOGUE
 openReportDialog(){
  const dialogRef = this.dialog.open(ReviewsReportComponent,
    {
      disableClose: true,
      autoFocus: true,
      panelClass: 'report-panel'
    });
  
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
 }

}
