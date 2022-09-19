import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendorsServiceService {

  constructor() { }

  public theId!:number;

  public tranferId(id:number)
  {
    this.theId = id;
  }
}
