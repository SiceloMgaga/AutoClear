import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Products } from '../shared/products';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../shared/user.service';
import { MatSort } from '@angular/material/sort';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements AfterViewInit {

  dataSource!: MatTableDataSource<Products>

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   @ViewChild(ModalDirective) modal!: ModalDirective;

  constructor(private service: UserService) { 
    this.getProducts();
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Products>();
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.dataSource.sort = this.sort;
  }

  //GET
  getProducts()
  {
    this.service.getProducts().subscribe((response: any) =>
      { 
        console.log(response)
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);
        localStorage.setItem("Products" , JSON.stringify(response));
      });
  }

  //SEARCH
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);

    if (this.dataSource.paginator) 
    {
      this.dataSource.paginator.firstPage();
    }
  }

}
