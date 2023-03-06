import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { duration } from 'html2canvas/dist/types/css/property-descriptors/duration';
import { NgToastService } from 'ng-angular-popup';

import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  err = 0;
  currentUser= new User();
  passwordVisible = false;
  constructor(private authService: AuthService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
  }


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    console.log("taggle", this.passwordVisible);
  }

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
         this.showSuccess() 
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.authService.getCurrentUser().subscribe(user => {
          this.currentUser = user;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          setTimeout(() => {
            window.location.href = "/joblist"
          }, 2000);
        
          console.log("user",this.currentUser);
        });
        //this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;
      }
    });
  }

  showSuccess() {
    this.toast.success({ detail: "SUCCESS", summary: 'Logging with succed', duration: 5000 });
  }

 

}
