import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Message } from '../view-vendor/models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  SendMessage(newMessage: Message): Observable<Object>
  {
    return this.http.post(`${environment.apiURL + 'Messages/ContactVendor'}`, newMessage);
  }
}
