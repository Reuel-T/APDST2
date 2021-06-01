import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //observeable value that changes depending on if a valid token is stored or not
  private loggedIn = new Subject< boolean > ();

  //Storing our token - Used for managing sessions, helping prevent session jacking
  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  //returns the token
  getToken()
  {
    return this.token;
  }

  //creates a user
  createUser(usernameIn : String, emailIn : String, passwordIn : String, deptIn: String, adminIn: boolean)
  {
    //Quick check to make sure the value coming in is not empty, can cause issues otherwise
    if(!adminIn)
    {
      adminIn = false;
    }
    
    //creating an authdata object to be added to the post request, this is the user's details
    const authData : AuthData = {username : usernameIn, email : emailIn, password : passwordIn, department: deptIn, admin: adminIn}

    this.http.post('https://localhost:3000/api/user/signup', authData)
    .subscribe(response => 
      {
        console.log(response);
        this.router.navigateByUrl('/');
      })
  }

  //returns the result of checking if the user is logged in or not,
  //by if the token has a value
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

  //returns the logged in value as an observable so other components
  //can subscribe to the changes and react accordingly
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
        //updates the logged in variable
        this.loggedIn.next(true);
        //When a user is logged in, route them to the post list
        this.router.navigateByUrl('/posts');
      })
  }

  //logout method
  logout()
  {
    //clears the session token
    this.token = undefined;
    //updates the logged in variable
    this.loggedIn.next(false);
  }
}
