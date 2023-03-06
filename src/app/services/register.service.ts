import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiURL: string = 'http://localhost:8080/job/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  register(user: User): Observable<User> {
    /*  return this.http.post<Produit>(this.apiURL, prod, httpOptions); // post prod,httpoptions
     } */

    return this.http.post<User>('http://localhost:8080/job/api', user, httpOptions);
  }

  listeUser(): Observable<User[]> { // return un tableau de type observable
    /*  return this.http.get<Produit[]>(this.apiURL); // get
     } */
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<User[]>(this.apiURL + "all", { headers: httpHeaders });
  }


  consulterUser(id: number): Observable<User> {
    /* const url = `${this.apiURL}/${id}`;
    return this.http.get<Produit>(url); // get produit bel id fel parameter
    } */
    const url = `${this.apiURL}${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<User>(url, { headers: httpHeaders });
  }

  consulterUserbyusername(username: string): Observable<User> {
    /* const url = `${this.apiURL}/${id}`;
    return this.http.get<Produit>(url); // get produit bel id fel parameter
    } */
    const url = `${this.apiURL}/getUser/${username}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<User>(url, { headers: httpHeaders });
  }


  updateUser(prod: User): Observable<User> {
    /* return this.http.put<Produit>(this.apiURL, prod, httpOptions); // put kima post
    } */
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<User>(this.apiURL, prod, { headers: httpHeaders });
  }



}
