import { Component, OnInit, SecurityContext } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service'; 
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, protected sanitizer: DomSanitizer) { }
  
  /*
   * Login Component uses Regex and required fields to validate
   * input before submission (in HTML Teplate)
   * 
   * Input is sanitized by the DOM Sanitizer
   * We can't trust input from the frontend :(
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
      this.authService.login(
        this.sanitizer.sanitize(SecurityContext.HTML, form.value.entredEmail), 
        this.sanitizer.sanitize(SecurityContext.HTML, form.value.entredPassword)
        );
    }
  }

}
