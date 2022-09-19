import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor() { }

  public theId!:any;

  public tranferId(id: any)
  {
    this.theId = id;
  }
}
