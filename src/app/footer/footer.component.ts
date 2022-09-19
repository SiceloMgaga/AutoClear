import { Newsletter } from './../shared/newsletter';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  EmailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  subscriberForm: FormGroup = new FormGroup(
    {
      emailAddress: new FormControl("", [Validators.required,Validators.pattern(this.EmailPattern)])
    });

  constructor(private Service : UserService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  addSubscriber()
  {
    if(this.subscriberForm.valid)
    {
      let newsletter = new Newsletter();
      newsletter.EmailAddress = this.subscriberForm.value.emailAddress;

      this.subscriberForm.reset()

      this.Service.CreateNewsletter(newsletter).subscribe(response =>{
     setTimeout(() => window.location.reload());
    console.log(response)
    });

      //SUCCESS SNACKBAR
      this.snack.open('Successfully subscribed to Newsletter! ', 'OK',
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

