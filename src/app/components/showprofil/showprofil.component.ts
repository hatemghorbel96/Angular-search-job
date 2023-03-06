import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cv } from 'src/app/model/cv';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProfilService } from 'src/app/services/profil.service';

@Component({
  selector: 'app-showprofil',
  templateUrl: './showprofil.component.html',
  styleUrls: ['./showprofil.component.css']
})
export class ShowprofilComponent implements OnInit {
  user!: User;
  activecv!: Cv;
  public skills: string[];
  public interest: string[];
  public languages: string[];
  constructor(private profileservice: ProfilService, public authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getuser()
    this.cv()
  }

  getuser() {
    const currentusername = this.route.snapshot.paramMap.get('username')!;
    this.profileservice.getUserbyusername(currentusername).subscribe(datauser => {
      this.user = datauser;
    })
  }

  cv() {
    const currentusername = this.route.snapshot.paramMap.get('username')!;
    this.profileservice.getCVbyusername(currentusername).subscribe(datacv => {
      this.activecv = datacv;
      this.skills = this.activecv.skills.split(',');
      this.interest = this.activecv.interest.split(',');
      this.languages = this.activecv.langues.split(',');
    })
  }
}
