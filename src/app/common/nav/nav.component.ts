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
   */
  private loginSub: Subscription
  isLoggedIn: boolean = false;


  ngOnInit(): void {
    this.authService.checkLogin();
    this.loginSub = this.authService.getUpdatedLogin().subscribe((value : boolean) => 
    {
      this.isLoggedIn = value;
    })
  }
 
  onLogout()
  {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
