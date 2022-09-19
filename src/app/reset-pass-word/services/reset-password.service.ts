import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor() { }

  public theId!:any;

  public tranferId(id: any)
  {
    this.theId = id;
  }
}
