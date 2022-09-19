import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Application } from './models/application';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../shared/user';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  id!: any;
  users: User = new User();
  username!: string;

  constructor(private breakpointObserver: BreakpointObserver,private service:UserService, private router:Router, private toastr:ToastrService,private snack: MatSnackBar) { }

    formApply: FormGroup = new FormGroup({
    BusinessName: new FormControl("", Validators.required),
    EmailAddress: new FormControl("", Validators.required),
    CellphoneNumber: new FormControl("", Validators.required),
    VendorAddress_Line1: new FormControl("", Validators.required),
    VendorAddress_Line2: new FormControl("", Validators.required),
    VendorAddress_Line3: new FormControl(""),
    Vendor_City_Town: new FormControl("", Validators.required),
    Vendor_PostalCode: new FormControl("", Validators.required),
    VATReg: new FormControl("", Validators.required)
  });

  ngOnInit(): void {

    this.username = JSON.parse(localStorage.getItem('currentUser') || '{}').email;
    let users = JSON.parse(localStorage.getItem('users') || '{}');

    for(let x = 0; x < users.length; x++)
    {
      if(users[x].email == this.username)
      {
        this.id = users[x].id
        console.log(users[x].id)
        console.log(users[x].email)
      }
    }
  }

  onSubmit()
  {
    if(this.formApply.valid)
    {
      let newVendor = new Application();
      newVendor.UserId = this.id;
      newVendor.BusinessName = this.formApply.value.BusinessName;
      newVendor.EmailAddress = this.formApply.value.EmailAddress;
      newVendor.CellphoneNumber = this.formApply.value.CellphoneNumber;
      newVendor.VendorAddress_Line1 = this.formApply.value.VendorAddress_Line1;
      newVendor.VendorAddress_Line2 = this.formApply.value.VendorAddress_Line2;
      newVendor.VendorAddress_Line3 = this.formApply.value.VendorAddress_Line3;
      newVendor.Vendor_City_Town = this.formApply.value.Vendor_City_Town;
      newVendor.Vendor_PostalCode = this.formApply.value.Vendor_PostalCode;
      newVendor.VATReg = this.formApply.value.VATReg;
      this.formApply.reset();
  

      //SEND DATA TO API
      this.service.apply(newVendor).subscribe(response =>{
        console.log(response)
      });
      
  
      //SUCCESS SNACKBAR
      this.snack.open('Application successfully submitted, we will be in touch soon!', 'OK',
      {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
      });
      this.router.navigateByUrl('/autoclearstore')
    }
    else
    {
      this.snack.open('Form Invalid, Please enter all required fields! ', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
    }
}

}
