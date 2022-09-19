import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductIDServiceService {

  constructor() { }

  public theId!:number;

  public tranferId(id:number)
  {
    this.theId = id;
  }
}
