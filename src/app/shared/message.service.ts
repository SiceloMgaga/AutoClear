import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  subject = new Subject()


    //called from product
  sendMessage(product: unknown) 
  {
   
    this.subject.next(product) //Triggering an event
  }

  //called from cart
  getMessage() 
  {
    return this.subject.asObservable()
  }
}
