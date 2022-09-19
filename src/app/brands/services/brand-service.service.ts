import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandServiceService {

  constructor() { }

  public theId!:number;

  public tranferId(id: number)
  {
    this.theId = id;
  }
}
