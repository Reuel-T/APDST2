import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import  jwt_decode  from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new Subject< boolean > ();

  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  getToken()
  {
    return this.token;
  }

  //creates a user
  createUser(usernameIn : String, emailIn : String, passwordIn : String, deptIn: String, adminIn: boolean)
  {
    if(!adminIn)
    {
      adminIn = false;
    }
    
    const authData : AuthData = {username : usernameIn, email : emailIn, password : passwordIn, department: deptIn, admin: adminIn}

    this.http.post('https://localhost:3000/api/user/signup', authData)
    .subscribe(response => 
      {
        console.log(response);
        this.router.navigateByUrl('/');
      })
  }


  checkLogin()
  {
    if(!this.token)
    {
      return false;
    }else
    {
      return true;
    }
  }

  //checks if a user is logged in
  getUpdatedLogin()
  {
    return this.loggedIn.asObservable();
  }

  //login function
  login( emailIn : string, passwordIn : string)
  {
    const authData  = {email : emailIn, password : passwordIn};

    this.http.post<{token: string}>('https://localhost:3000/api/user/login', authData)
    .subscribe(response => 
      {
        //saves token for authentication
        const token = response.token;
        this.token = token;
        this.loggedIn.next(true);
        this.router.navigateByUrl('/posts');
      })
  }

  //logout method
  logout()
  {
    this.token = undefined;
    this.loggedIn.next(false);
  }
}
