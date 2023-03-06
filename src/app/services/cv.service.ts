import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cv } from '../model/cv';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  

  constructor(private http: HttpClient, private authService: AuthService) { }

  addcv(c: Cv): Observable<Cv> {

    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Cv>(`http://localhost:8080/job/cv/add/${this.authService.loggedUser}`, c, { headers: httpHeaders });
  }
}
