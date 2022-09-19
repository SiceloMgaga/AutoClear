import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor() { }

  public theId!:number;

  public tranferId(id: number)
  {
    this.theId = id;
  }
}
