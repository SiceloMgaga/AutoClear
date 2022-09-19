import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Vendor } from 'src/app/shared/vendor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorsServiceService } from '../services/vendors-service.service';

@Component({
  selector: 'app-add-edit-vendor',
  templateUrl: './add-edit-vendor.component.html',
  styleUrls: ['./add-edit-vendor.component.scss']
})
export class AddEditVendorComponent implements OnInit {

  cName!:string;
  eAddress!:string;
  com!:string;
  cell!:string;
  line1!:string;
  line2!:string;
  line3!:string;
  updatecity!:string;
  updatepostalCode!:string;
  updateVatRegNo!:string;

  constructor(private Service : UserService, private snack: MatSnackBar,private vendorID: VendorsServiceService,private router: Router) { }


  id!: number;
  vendor: Vendor = new Vendor();
  EmailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  //FORM VALIDATION
  editForm: FormGroup = new FormGroup(
    {
        companyName: new FormControl("", Validators.required),
        emailAddress: new FormControl("", [Validators.required,Validators.pattern(this.EmailPattern)]),
        commission: new FormControl("", [Validators.required,Validators.pattern("^[0-9]*$")]),
        phone: new FormControl("", [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]),
        addressline1: new FormControl("", Validators.required),
        addressline2: new FormControl("", Validators.required),
        addressline3: new FormControl("", Validators.nullValidator),
        city: new FormControl("", Validators.required),
        postalCode: new FormControl("", [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(4), Validators.maxLength(4)]),
        VatRegNo: new FormControl("", [Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern("^[0-9]*$")]) 
    });


  ngOnInit(): void {    
    // this.id = this.route.snapshot.params['id'];
    this.id = this.vendorID.theId;
    console.log(this.id)

    this.Service.getVendorById(this.id).subscribe((data:Vendor) => {
      this.vendor = data;
    }, error => console.log(error));


    let vendorsList = JSON.parse(localStorage.getItem('Vendors')|| '{}');

    for(var x = 0; x < vendorsList.length; x++){
      if(vendorsList[x].vendorId == this.id)
      {
        this.cName = vendorsList[x].businessName;
        this.eAddress = vendorsList[x].emailAddress;
        this.com = vendorsList[x].commission;
        this.cell = vendorsList[x].cellphoneNumber;
        this.line1 = vendorsList[x].vendorAddress_Line1;
        this.line2 = vendorsList[x].vendorAddress_Line2;
        this.line3 = vendorsList[x].vendorAddress_Line3;
        this.updatecity = vendorsList[x].vendor_City_Town;
        this.updatepostalCode = vendorsList[x].vendor_PostalCode;
        this.updateVatRegNo = vendorsList[x].vatReg;

        this.editForm.patchValue(
        {
          companyName: this.cName,
          emailAddress: this.eAddress,
          commission: this.com,
          phone: this.cell,
          addressline1: this.line1,
          addressline2: this.line2,
          addressline3: this.line3,
          city: this.updatecity,
          postalCode: this.updatepostalCode,
          VatRegNo: this.updateVatRegNo
        });
      }

    }
  }

  //UPDATE VENDOR
  updateVendor()
  {
    if(this.editForm.valid)
    {
      this.vendor.BusinessName = this.editForm.value.companyName;
      this.vendor.CellphoneNumber = this.editForm.value.phone;
      this.vendor.Commission = this.editForm.value.commission;
      this.vendor.EmailAddress = this.editForm.value.emailAddress;
      this.vendor.VendorAddress_Line1 = this.editForm.value.addressline1;
      this.vendor.VendorAddress_Line2 = this.editForm.value.addressline2;
      this.vendor.VendorAddress_Line3 = this.editForm.value.addressline3;
      this.vendor.Vendor_City_Town = this.editForm.value.city;
      this.vendor.Vendor_PostalCode = this.editForm.value.postalCode;
      this.vendor.VATReg = this.editForm.value.VatRegNo;
      //SEND DATA TO API
      this.Service.updateVendor(this.id, this.vendor).subscribe( data =>{
        console.log(data);
        setTimeout(() => window.location.reload());
      }
      , error => console.log(error));
  
      //SUCCESS SNACKBAR
      this.snack.open('Successfully Updated Vendor! ', 'OK',
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
