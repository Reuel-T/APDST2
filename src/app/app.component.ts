import { Component, OnInit } from '@angular/core';
import { AuthService } from './Auth/auth.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'apds-t2';


  constructor() { }
  
  ngOnInit(): void {
    
  }
}
