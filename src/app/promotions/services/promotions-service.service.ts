import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Discount } from '../models/discount';
import { DiscountType } from '../models/discount-type';
import { Promotion } from '../models/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionsServiceService {

  constructor(private http: HttpClient) { }

  public theId!:number;

  public tranferId(id:number)
  {
    this.theId = id;
  }

  //PROMOTION CRUD
  public CreatePromotion(newPromo: Promotion)
  {
    return this.http.post(environment.apiURL + 'Promotions/CreatePromotion', newPromo);
  }

  getPromotionsList() : Observable<Promotion[]>
  {
    return this.http.get<Promotion[]>(environment.apiURL + 'Promotions');
  }

  getPromotionById(Id: number): Observable<Promotion>
  {
    return this.http.get<Promotion>(`${environment.apiURL + 'Promotions'}/${Id}`);
  }

  updatePromotion(Id: number, review: Promotion): Observable<Object>
  {
    return this.http.put(`${environment.apiURL + 'Promotions'}/${Id}`, review);
  }

  deletePromotion(Id: number): Observable<Object>
  {
    return this.http.delete(`${environment.apiURL + 'Promotions'}/${Id}`);
  }

  //DISCOUNT CRUD
  getDiscountsList() : Observable<Discount[]>
  {
    return this.http.get<Discount[]>(environment.apiURL + 'Discount/GetDiscounts');
  }

  getDiscountById(DiscountId: number): Observable<Discount>
  {
    return this.http.get<Discount>(`${environment.apiURL + 'Discounts'}/${DiscountId}`);
  }

  updateDiscount(DiscountId: number, review: Discount): Observable<Object>
  {
    return this.http.put(`${environment.apiURL + 'Discounts'}/${DiscountId}`, review);
  }

  deleteDiscount(DiscountId: number): Observable<Object>
  {
    return this.http.delete(`${environment.apiURL + 'Discounts'}/${DiscountId}`);
  }

  //DISCOUNT TYPE CRUD
  getDiscountsTypeList() : Observable<DiscountType[]>
  {
    return this.http.get<DiscountType[]>(environment.apiURL + 'DiscountType/GetDiscountTypes');
  }

  getDiscountTypeById(DiscountId: number): Observable<DiscountType>
  {
    return this.http.get<DiscountType>(`${environment.apiURL + 'DiscountType'}/${DiscountId}`);
  }

  updateDiscountType(DiscountId: number, review: DiscountType): Observable<Object>
  {
    return this.http.put(`${environment.apiURL + 'DiscountType'}/${DiscountId}`, review);
  }

  deleteDiscountType(DiscountId: number): Observable<Object>
  {
    return this.http.delete(`${environment.apiURL + 'DiscountType'}/${DiscountId}`);
  }
}
