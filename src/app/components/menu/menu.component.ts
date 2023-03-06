import { ProfilService } from 'src/app/services/profil.service';
import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input()
  minititle: string = 'Profile Settings';
  currentUser = new User();
  p: number = 1;
  editingfirstname = false;
  editinglastname = false;
  editingmail = false;
  constructor(private toast: NgToastService,private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef, public authService: AuthService, private profile: ProfilService) { }

  
  ngOnInit() {

    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    })

    this.editingfirstname = false;
    this.editinglastname = false;
    this.editingmail = false;
    /* this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        switch (event.urlAfterRedirects) {
          case '/mycv':
            this.minititle = 'My CV';
            console.log(this.minititle)
            break;
          case '/mypostlist':
            this.minititle = 'My Post List';
            console.log(this.minititle)
            break;
          case '/saved':
            this.minititle = 'Saved Jobs';
            console.log(this.minititle)
            break;
          default:
            this.minititle = 'Profile Settings';
            console.log(this.minititle)
            break;
        }
        this.cd.detectChanges();  
      }
    }); */
  }


  isActive(path: string) {
    return this.router.url === path;
  }


  startEditing() {
    this.editingfirstname = true;

  }

  stopEditing() {
    this.editingfirstname = false;
    this.profile.updateinfo(this.currentUser).subscribe(
      data => {
        console.log(data)
      }
    )
    this.showSuccess('first name');
  }

  startEditinglastname() {
    this.editinglastname = true;

  }

  stopEditinglastname() {
    this.editinglastname = false;
    this.profile.updateinfo(this.currentUser).subscribe(
      data => {
        console.log(data)
      }
    )
    this.showSuccess('last name');
  }

  startEditingmail() {
    this.editingmail = true;

  }

  stopEditingmail() {
    this.editingmail = false;
    this.profile.updateinfo(this.currentUser).subscribe(
      data => {
        console.log(data)
      }
    )
    this.showSuccess('email');
  }



  showSuccess(h) {
    this.toast.success({
      detail: "SUCCESS", summary: `${h} edited with success`, duration: 2000 });
  }
}
