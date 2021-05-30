import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  usernameError : string = 'Please enter a valid username';
  emailError:string = 'Please enter a valid email address';
  passwordError: string ='Please enter a password that conatains lowercase, uppercase letters and at least one number';
  departmentError: string = 'Please Select a Department';
  
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignUp(form:NgForm)
  {
    if(form.invalid)
    {
      return;
    }else
    {
      //match name in html
      this.authService.createUser(form.value.entredUsername, form.value.entredEmail, form.value.entredPassword,  form.value.entredDept, form.value.role);
      console.log(form.value);
    }
  }

}
