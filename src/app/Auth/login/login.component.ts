import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }
  
  /*
   * Login Component uses Regex and required fields to validate
   * input before submission
   */

  emailError:string = 'Please enter a valid email address';
  passwordError: string ='Enter your password';

  ngOnInit(): void {
  }

  onLogin(form: NgForm)
  {
    if(form.invalid)
    {
      return;
    }else
    {
      this.authService.login(form.value.entredEmail, form.value.entredPassword);
    }
    console.log(form.value);
  }

}
