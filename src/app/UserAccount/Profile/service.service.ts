import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  public theId!:any;

  public tranferId(id: any)
  {
    this.theId = id;
  }
}
