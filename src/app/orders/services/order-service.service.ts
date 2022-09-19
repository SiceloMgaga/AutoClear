import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { OrderStatus } from '../models/orderStatus';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http: HttpClient) { }

  CreateOrder(newOrder: Order): Observable<Object>
  {
    return this.http.post(`${environment.apiURL + 'Orders/CreateOrder'}`, newOrder);
  }

  getOrdersList() : Observable<Order[]>
  {
    return this.http.get<Order[]>(environment.apiURL + 'Orders/GetOrders');
  }

  getOrderById(OrderId: number): Observable<Order>
  {
    return this.http.get<Order>(`${environment.apiURL + 'Orders'}/${OrderId}`);
  }

  updateOrder(OrderId: number, vendor: Order): Observable<Object>
  {
    return this.http.put(`${environment.apiURL + 'Orders'}/${OrderId}`, vendor);
  }

  deleteOrder(OrderId: number): Observable<Object>
  {
    return this.http.delete(`${environment.apiURL + 'Orders'}/${OrderId}`);
  }


  //ORDER STATUS
  getOrderStatusList() : Observable<OrderStatus[]>
  {
    return this.http.get<OrderStatus[]>(environment.apiURL + 'OrderStatus/GetOrderStatus');
  }

  getOrderStatusById(Id: number): Observable<OrderStatus>
  {
    return this.http.get<OrderStatus>(`${environment.apiURL + 'OrderStatus'}/${Id}`);
  }

  updateOrderStatus(Id: number, vendor: OrderStatus): Observable<Object>
  {
    return this.http.put(`${environment.apiURL + 'OrderStatus'}/${Id}`, vendor);
  }

  deleteOrderStatus(Id: number): Observable<Object>
  {
    return this.http.delete(`${environment.apiURL + 'OrderStatus'}/${Id}`);
  }
}
