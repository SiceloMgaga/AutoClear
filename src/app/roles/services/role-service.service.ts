import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {

  constructor() { }

  public theId!:any;

  public tranferId(id: any)
  {
    this.theId = id;
  }
}
