import { Injectable } from '@angular/core';
import { Sale } from '../models/sale';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  CreateSale(createForm: Sale): Observable<Object>
  {
    return this.http.post(`${environment.apiURL + 'Sale/CreateSale'}`, createForm);
  }

  getSalesList() : Observable<Sale[]>
  {
    return this.http.get<Sale[]>(environment.apiURL + 'Sale/GetSale');
  }

  getSaleById(SaleId: number): Observable<Sale>
  {
    return this.http.get<Sale>(`${environment.apiURL + 'Sale'}/${SaleId}`);
  }

  updateSale(SaleId: number, Sale: Sale): Observable<Object>
  {
    return this.http.put(`${environment.apiURL + 'Sale'}/${SaleId}`, Sale);
  }

  deleteSale(SaleId: number): Observable<Object>
  {
    return this.http.delete(`${environment.apiURL + 'Sale'}/${SaleId}`);
  }


}
