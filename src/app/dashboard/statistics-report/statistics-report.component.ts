import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'

@Component({
  selector: 'app-statistics-report',
  templateUrl: './statistics-report.component.html',
  styleUrls: ['./statistics-report.component.scss']
})
export class StatisticsReportComponent implements OnInit {

  @ViewChild('htmlData') htmlData:ElementRef | any;

  constructor() { }

  ngOnInit(): void {
 }

issueDate = new Date().toDateString();
generator = 'SystemOps'

// PDF Options
public openPDF(){
  let Data = document.getElementById('htmlData')!;

  html2canvas(Data).then(canvas => {
    let fileWidth = 210;
    let fileHeight = canvas.height * fileWidth / canvas.width;

    const contentDataUrl = canvas.toDataURL('image/png');

    let PDF = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });

    let topPosition = 10;
    let leftPosition = 0;

    PDF.addImage(contentDataUrl, 'PNG', leftPosition, topPosition, fileWidth, fileHeight);
    PDF.save('StatsReport.pdf');
  })
}

}
