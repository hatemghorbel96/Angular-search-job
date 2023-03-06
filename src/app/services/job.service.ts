import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorit } from '../model/favorit';
import { Job } from '../model/job';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient,private authService: AuthService) { }

  addjob(j: Job): Observable<Job> {

    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Job>(`http://localhost:8080/job/jobapi/add/${this.authService.loggedUser}`, j, { headers: httpHeaders });
  }

  getalljobs(): Observable<Job[]> {

    return this.http.get<Job[]>("http://localhost:8080/job/jobapi/all", httpOptions);

  }

  getJob(id:number): Observable<Job> {

    return this.http.get<Job>(`http://localhost:8080/job/jobapi/getjob/${id}`, httpOptions);

  }

  searchByPrix(max: number, min: number): Observable<Job[]> {


    const searchUrl = `http://localhost:8080/job/jobapi/jobByPrix/${max}/${min}`;

    return this.http.get<Job[]>(searchUrl, httpOptions);
  }

  getpostedJob(): Observable<Job[]> {

    return this.http.get<Job[]>(`http://localhost:8080/job/jobapi/getjobbyusername/${this.authService.loggedUser}`, httpOptions);

  }

  addfavorit(id:number) {

    return this.http.post(`http://localhost:8080/job/favorit/addfavorit/${this.authService.loggedUser}/${id}`, httpOptions);

  }

  annulefavorit(id: number) {

    return this.http.delete(`http://localhost:8080/job/favorit/annule/${this.authService.loggedUser}/${id}`, httpOptions);
  }

  myfavorit(): Observable<Favorit[]> {

    return this.http.get<Favorit[]>(`http://localhost:8080/job/favorit/getfavorit/${this.authService.loggedUser}`, httpOptions);
  }
}
