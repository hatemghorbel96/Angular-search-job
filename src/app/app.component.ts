import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'job';

  gg!:string;
  constructor(public authService: AuthService, private router: Router) { }


  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let type = currentUser.type;
    this.gg = type;
    console.log(type);


    
    this.authService.loadToken();
    if (this.authService.getToken() == null ||
      this.authService.isTokenExpired())
      this.router.navigate(['/login']);
    
   
  }

  getCurrentUserEmail(): string {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
   
    if (currentUser)
      return currentUser.email;
    return "";
  }

  getCurrentUser(): User {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

  
      return currentUser;
   
  }


  public onLogout() {
    this.authService.logout();
    localStorage.clear();
    this.gg=null;
  }

}
