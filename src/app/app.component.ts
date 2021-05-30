import { Component, OnInit } from '@angular/core';
import { AuthService } from './Auth/auth.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'apds-t2';
  loggedIn :string;

  constructor(public authService: AuthService) { }
  
  ngOnInit(): void {
    this.loggedIn = this.authService.getToken();
  }
  
  htmlSnippet = 'Template <script> alert("yeet")</script> <b>Syntax</b>'

  

}
