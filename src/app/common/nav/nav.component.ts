import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Auth/auth.service'; 
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  /**
   * Nav Component that handles navigation between app components
   * Post List, Sign Up, Login, Create Post
   */
  private loginSub: Subscription
  isLoggedIn: boolean = false;


  ngOnInit(): void {
    //subscribes to the logged in variable in the auth service
    //nav bar changes availabale options depending on if there is a user logged in or not
    this.authService.checkLogin();
    this.loginSub = this.authService.getUpdatedLogin().subscribe((value : boolean) => 
    {
      this.isLoggedIn = value;
    })
  }
 
  onLogout()
  {
    //logs the user out and returns them to the login page
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
