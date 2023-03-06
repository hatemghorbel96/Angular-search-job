import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedUser!: string;

  public isloggedIn: Boolean = false;
  public roles!: string[];

  apiURL: string = 'http://localhost:8080/job/users';
  token!: string | null;
  host: string = "http://localhost:8080";
  private helper = new JwtHelperService();
  constructor(private router: Router, private http: HttpClient) { }

  login(user: User) {
    return this.http.post<User>('http://localhost:8080/job/login', user, { observe: 'response' });
  }

  getCurrentUser(): Observable<User> {
    
    return this.http.get<User>(`http://localhost:8080/job/api/currentuser/${this.loggedUser}`);
  }



  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }
  decodeJWT() {
    if (this.token == undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.isloggedIn = true;
    this.loggedUser = decodedToken.sub;

  }
  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }
  getToken(): string {
    return this.token!;
  }

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token!);
  }



  isAdmin(): Boolean {
    if (!this.roles)
      return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }

  register(u: FormData) {


    return this.http.post<User>('http://localhost:8080/job/api', u);
  }


}