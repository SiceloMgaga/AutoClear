import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Vendor } from 'src/app/shared/vendor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-create-vendor',
  templateUrl: './create-vendor.component.html',
  styleUrls: ['./create-vendor.component.scss']
})
export class CreateVendorComponent implements OnInit {

  EmailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  //FORM VALIDATION
  createForm: FormGroup = new FormGroup(
    {
      id: new FormControl("", Validators.required),
      companyName: new FormControl("", Validators.required),
      emailAddress: new FormControl("", [Validators.required,Validators.pattern(this.EmailPattern)]),
      commission: new FormControl("", [Validators.required,Validators.pattern("^[0-9]*$")]),
      phone: new FormControl("", [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]),
      addressline1: new FormControl("", Validators.required),
      addressline2: new FormControl("", Validators.required),
      addressline3: new FormControl("", Validators.nullValidator),
      city: new FormControl("", Validators.required),
      postalCode: new FormControl("", [Validators.required,Validators.pattern("^[0-9]*$")]),
      VatRegNo: new FormControl("", [Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern("^[0-9]*$")]) 
    });
  
  constructor(private Service : UserService, private snack: MatSnackBar) { }

  ngOnInit(): void {}

  addVendor()
  {
    if(this.createForm.valid)
    {
      let user = new User();
      let newVendor = new Vendor();

      //update user
      user.UserId = this.createForm.value.id;
      user.Roles = "Vendor";
      user.Email = newVendor.EmailAddress = this.createForm.value.emailAddress;
      user.FullName = newVendor.BusinessName = this.createForm.value.companyName;
      user.PhoneNumber = newVendor.CellphoneNumber = this.createForm.value.phone;

      //add vendor
      newVendor.AppUserId = user.UserId;
      newVendor.BusinessName = this.createForm.value.companyName;
      newVendor.CellphoneNumber = this.createForm.value.phone;
      newVendor.Commission = this.createForm.value.commission;
      newVendor.EmailAddress = this.createForm.value.emailAddress;
      newVendor.VendorAddress_Line1 = this.createForm.value.addressline1;
      newVendor.VendorAddress_Line2 = this.createForm.value.addressline2;
      newVendor.VendorAddress_Line3 = this.createForm.value.addressline3;
      newVendor.Vendor_City_Town = this.createForm.value.city;
      newVendor.Vendor_PostalCode = this.createForm.value.postalCode;
      newVendor.VATReg = this.createForm.value.VatRegNo;

      console.log(newVendor.VendorId,newVendor.AppUserId,user.UserId)

      //SEND DATA TO API
      this.Service.CreateVendor(newVendor).subscribe(response =>{
        setTimeout(() => window.location.reload());
        console.log(response)
      });
     
  
      //SUCCESS SNACKBAR
      this.snack.open('Successfully created Vendor! ', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
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
