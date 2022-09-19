import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { RoleServiceService } from '../services/role-service.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {

  id!: any;
  users: User = new User();
  updatedRole: User = new User();
  
  constructor(private Service : UserService, private snack: MatSnackBar, private router: Router, private roleId: RoleServiceService) { }

  //FORM VALIDATION
editForm: FormGroup = new FormGroup(
{
  Role: new FormControl("", Validators.required)
});

  ngOnInit(): void 
  {
    this.id = this.roleId.theId;
    console.log(this.id)

    this.Service.getUserById(this.id).subscribe((response: User) =>
    {
      console.log(response);
      localStorage.setItem("users", JSON.stringify(response))
      this.users = response;
    });   
    
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    for(let x = 0; x < users.length; x++)
    {
      console.log(users[x].id)
      if(users[x].id == this.id)
      {
        console.log(users[x].id)
        this.updatedRole.FullName = users[x].fullName;
        console.log(this.updatedRole.FullName)
        this.updatedRole.Email = users[x].email;
        this.updatedRole.Address = users[x].address;
        this.updatedRole.PhoneNumber = users[x].phoneNumber;
        this.updatedRole.Password = users[x].password;
      }
    }
  }

  //UPDATE
  updateRole()
  {
    if(this.editForm.valid)
    {
      this.updatedRole.Roles = this.editForm.value.Role;

      this.Service.updateUser(this.id, this.updatedRole).subscribe( data =>{
        console.log(data);
        setTimeout(() => window.location.reload());
      }
      , error => console.log(error));
  
      //SUCCESS SNACKBAR
      this.snack.open('Successfully Updated Role! ', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
    }
    else
    {
      this.snack.open('Form Invalid, Please enter a role! ', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
    }
  }
}
