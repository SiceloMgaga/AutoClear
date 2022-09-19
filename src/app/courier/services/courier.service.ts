import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Courier } from '../models/courier';
import { CourierType } from '../models/courier-type';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  public theId!:number;

  public tranferId(id:number)
  {
    this.theId = id;
  }

  constructor(private http: HttpClient) { }

  //Courier CRUD
  CreateCourier(createForm: Courier): Observable<Object>
  {
    return this.http.post(`${environment.apiURL + 'Courier/CreateCourier'}`, createForm);
  }

  getCouriersList() : Observable<Courier[]>
  {
    return this.http.get<Courier[]>(environment.apiURL + 'Courier/GetCouriers');
  }

  getCourierById(CourierId: number): Observable<Courier>
  {
    return this.http.get<Courier>(`${environment.apiURL + 'Courier'}/${CourierId}`);
  }

  updateCourier(CourierId: number, review: Courier): Observable<Object>
  {
    return this.http.put(`${environment.apiURL + 'Courier'}/${CourierId}`, review);
  }

  deleteCourier(CourierId: number): Observable<Object>
  {
    return this.http.delete(`${environment.apiURL + 'Courier'}/${CourierId}`);
  }

  //Courier TYPE CRUD
  getCouriersTypeList() : Observable<CourierType[]>
  {
    return this.http.get<CourierType[]>(environment.apiURL + 'CourierType/GetCourierTypes');
  }

  getCourierTypeById(CourierId: number): Observable<CourierType>
  {
    return this.http.get<CourierType>(`${environment.apiURL + 'CourierType'}/${CourierId}`);
  }

  updateCourierType(CourierId: number, review: CourierType): Observable<Object>
  {
    return this.http.put(`${environment.apiURL + 'CourierType'}/${CourierId}`, review);
  }

  deleteCourierType(CourierId: number): Observable<Object>
  {
    return this.http.delete(`${environment.apiURL + 'CourierType'}/${CourierId}`);
  }
}
