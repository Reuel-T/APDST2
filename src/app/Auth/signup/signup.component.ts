import { Component, OnInit, SecurityContext } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service'; 
import { DomSanitizer } from '@angular/platform-browser';

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
  
   /*
   * Sign up Component uses Regex and required fields to validate
   * input before submission (in HTML Teplate)
   * 
   * Dom Sanitizer is used to sanitize bad input 
   */
  
  constructor(public authService: AuthService, private sanitizer: DomSanitizer) { }

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
      this.authService.createUser(
        this.sanitizer.sanitize(SecurityContext.HTML,form.value.entredUsername),
        this.sanitizer.sanitize(SecurityContext.HTML, form.value.entredEmail), 
        this.sanitizer.sanitize(SecurityContext.HTML, form.value.entredPassword),
        this.sanitizer.sanitize(SecurityContext.HTML, form.value.entredDept),
        form.value.role);
    }
  }

}
