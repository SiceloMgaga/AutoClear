import { UserService } from './../shared/user.service';
import { Newsletter } from '../shared/newsletter';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserOptions } from 'jspdf-autotable';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { ngxCsv } from 'ngx-csv/ngx-csv';

interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void;
}

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit {

  displayedColumns: string[] = ['Address'];
  dataSource!: MatTableDataSource<Newsletter>;

  //custom filtering
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort ,{ static: true }) sort!: MatSort;

  constructor(public dialog: MatDialog,private _snackBar: MatSnackBar, private Service: UserService) {
    this.getSubscribers();
  }
  ngOnInit(): void {
  }

  ngAfterViewInit()
  {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() =>this.dataSource.sort = this.sort);
    console.log(this.dataSource);
  }

  getSubscribers():void
  {

    this.Service.getNewsletterList().subscribe((response: Newsletter[]) =>
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



      //DownloadPdf
     downloadpdf(){
     var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Newsletter Subscribers',
      useBom: true,
      noDownload: true,
      headers: ["Id", "Address"]
    };

      new ngxCsv(this.dataSource,"Newsletter Subscribers", options);
   }

}
