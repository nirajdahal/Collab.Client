import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError, of } from 'rxjs';
import { User } from 'src/app/@shared/models/user';
import { LoginResponse, UserForAuthenticationDto } from 'src/app/@shared/models/users/userForAuthenticationDto';
import { environment } from 'src/environments/environment';

const USERS = [
  {
    account: 'Admin',
    gender: 'male',
    userName: 'Admin',
    password: 'DevUI.admin',
    phoneNumber: '19999996666',
    email: 'admin@devui.com',
    userId: '100'
  },
  {
    account: 'User',
    gender: 'female',
    userName: 'User',
    password: 'DevUI.user',
    phoneNumber: '19900000000',
    email: 'user@devui.com',
    userId: '200'
  },
  {
    account: 'admin@devui.com',
    gender: 'male',
    userName: 'Admin',
    password: 'devuiadmin',
    phoneNumber: '19988888888',
    email: 'admin@devui.com',
    userId: '300'
  }
];

@Injectable()
export class AuthService {
  urlAddress = environment.apiUrl;
  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) {}

 
  public login = (userForAuthenticationDto: UserForAuthenticationDto) => {
    
    let body = userForAuthenticationDto
    return this._http.post<LoginResponse>(this.urlAddress +"accounts/login", body);
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  setSession(loginResponse: LoginResponse) {
    localStorage.setItem('id_token', JSON.stringify(loginResponse.token));
    localStorage.setItem('userinfo', JSON.stringify(loginResponse));
    
  }

  isUserLoggedIn() {
    if (localStorage.getItem('userinfo')) {
      return true;
    } else {
      return false;
    }
  }

  decodJwtToken(){
    const token = localStorage.getItem("id_token");
    const decodedToken = this._jwtHelper.decodeToken(token?.toString());
    return decodedToken;
  }

  getCurrentUserName(): string{
    
    const name = this.decodJwtToken()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
    console.log("username", name)
    return name;

  }
  

  public isUserAuthenticated = (): boolean => {
    var token = localStorage.getItem("id_token");
    console.log(this._jwtHelper.decodeToken(token?.toString()))
    let tokenPresent = true; 
    if(token === null){
      tokenPresent = false;
    }
    let tokenExpired = this._jwtHelper.isTokenExpired(token?.toString())
    console.log("tokenPresent", tokenPresent)
    console.log("tokenValid", !tokenExpired )
    console.log(tokenPresent && !tokenExpired)
    return (tokenPresent && !tokenExpired) ;
  }
}
