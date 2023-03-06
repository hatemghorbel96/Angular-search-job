import { Component, OnInit } from '@angular/core';
import { Cv } from 'src/app/model/cv';
import { AuthService } from 'src/app/services/auth.service';
import { ProfilService } from 'src/app/services/profil.service';

@Component({
  selector: 'app-allcv',
  templateUrl: './allcv.component.html',
  styleUrls: ['./allcv.component.css']
})
export class AllcvComponent implements OnInit {
  minititle = 'All cvs';
  allcv: Cv[];
  draft: number;
  active: number;
  activecv = new Cv();
  public skills: string[] = [];
  public interest: string[];
  public languages: string[];
  click: number;
  constructor(public authService: AuthService, private profileservice: ProfilService) { }

  ngOnInit(): void {
    this.getall()
    this.click = 1;
  }

  getall() {

    this.profileservice.getallmycv().subscribe(
      data => {
        this.allcv = data;
        this.draft = this.allcv.filter(item => item.publiccv === 0).length
        this.active = this.allcv.filter(item => item.publiccv === 1).length
      }
    )
  }

  getbyid(idcv) {
    //const idjob: number = +this.route.snapshot.paramMap.get('id')!;
    this.profileservice.getbyid(idcv).subscribe(
      data => {
        this.activecv = data;
        this.click = 2
        this.skills = this.activecv.skills.split(',');
        this.interest = this.activecv.interest.split(',');
        this.languages = this.activecv.langues.split(',');
      }
    )
  }

  editetat(idcv) {
    this.profileservice.changetatCV(this.activecv,idcv).subscribe(
      data => {
       console.log("edited",data)
        this.getbyid(idcv)
        this.getall()
      }
    )

  }

}
