import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../Auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   constructor(private authService: AuthService){}

   intercept(req: HttpRequest<any>, next : HttpHandler)
   {
    const authToken = this.authService.getToken();   

    /* 
     * Intercpets the requests made by the client
     * Adds the token from our auth service to our requests
     * The token is then used to authenticate our session
     * 
     * The Request is cloned and the authorization header is set with the token
     * 
     * Used in for authorization
     * 
     * The new, modified header is then returned
     */

    const authRequest = req.clone(
        {
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });
    return next.handle(authRequest);
   }
}