import { Postuler } from './../model/postuler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Favorit } from '../model/favorit';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PostulerService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  jobpostuler(post:Postuler,id:number): Observable<Postuler> {

    return this.http.post<Postuler>(`http://localhost:8080/job/postuler/add/${this.authService.loggedUser}/${id}`, post, httpOptions);
  }

  getbyJobid(id: number): Observable<Postuler[]> {

    return this.http.get<Postuler[]>(`http://localhost:8080/job/postuler/getbyjobid/${id}`, httpOptions);

  }

  getbyid(id: number): Observable<Postuler> {

    return this.http.get<Postuler>(`http://localhost:8080/job/postuler/getbyid/${id}`, httpOptions);

  }

  updatetat(p:Postuler[]): Observable<Postuler[]> {

    return this.http.put<Postuler[]>(`http://localhost:8080/job/postuler/edit`, p, httpOptions);

  }

  updateByIds(ids: number[]) {
    return this.http.put(`http://localhost:8080/job/postuler/edit`, { ids });
  }

  mypostulerlist(): Observable<Postuler[]> {

    return this.http.get<Postuler[]>(`http://localhost:8080/job/postuler/getbyusername/${this.authService.loggedUser}`, httpOptions);
  }

  


}
