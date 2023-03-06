import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cv } from '../model/cv';
import { User } from '../model/user';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  getCurrentUser(): Observable<User> {

    return this.http.get<User>(`http://localhost:8080/job/api/currentuser/${this.authService.loggedUser}`);
  }

  getactivecv(): Observable<Cv> {

    return this.http.get<Cv>(`http://localhost:8080/job/cv/getUsercv/${this.authService.loggedUser}`);
  }

  getallmycv(): Observable<Cv[]> {

    return this.http.get<Cv[]>(`http://localhost:8080/job/cv/getallcv/${this.authService.loggedUser}`);
  }

  getbyid(id:number): Observable<Cv> {

    return this.http.get<Cv>(`http://localhost:8080/job/cv/getbyid/${id}`);
  }

  changetatCV(cv:Cv,id: number) {

    return this.http.put(`http://localhost:8080/job/cv/editetat/${id}/${this.authService.loggedUser}`, cv);
  }

  getactivecvbyuser(username:string): Observable<Cv> {

    return this.http.get<Cv>(`http://localhost:8080/job/cv/getUsercv/${username}`);
  }

  getUserbyusername(username:string): Observable<User> {

    return this.http.get<User>(`http://localhost:8080/job/api/currentuser/${username}`);
  }

  getCVbyusername(username: string): Observable<Cv> {

    return this.http.get<Cv>(`http://localhost:8080/job/cv/getUsercv/${username}`);
  }

  updateinfo(u: User): Observable<User> {

    return this.http.put<User>(`http://localhost:8080/job/api/updateinfo/${this.authService.loggedUser}`, u, httpOptions);
  }
}
