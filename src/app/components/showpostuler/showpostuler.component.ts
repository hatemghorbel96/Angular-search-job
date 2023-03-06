import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Postuler } from 'src/app/model/postuler';
import { PostulerService } from 'src/app/services/postuler.service';
import { Job } from 'src/app/model/job';
import { JobService } from 'src/app/services/job.service';
import { ProfilService } from 'src/app/services/profil.service';
import { Cv } from 'src/app/model/cv';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-showpostuler',
  templateUrl: './showpostuler.component.html',
  styleUrls: ['./showpostuler.component.css']
})
export class ShowpostulerComponent implements OnInit {
  listpost:Postuler[];
  clickedjob = new Job();
  clickedpostuler = new Postuler()
  activecv!: Cv;
  public skills: string[];
  public interest: string[];
  public languages: string[];
  pdfUrl: SafeResourceUrl;

  selectedIds: number[] = [];
  selected = [];
  testselected=1;
  constructor(private sanitizer: DomSanitizer,private postulerService: PostulerService, private route: ActivatedRoute, private jobService: JobService, private profileservice: ProfilService, public authService: AuthService) { }

  ngOnInit(): void {
   
    this.getpostulerbyjobid()
    this.getjobbyid()
   
    
    
   
  }

  getpostulerbyjobid(){
    const jobid: number = +this.route.snapshot.paramMap.get('id')!;
    this.postulerService.getbyJobid(jobid).subscribe(
      data => {
        this.listpost = data;
      }
    )
  }

  getjobbyid(){
    const jobid: number = +this.route.snapshot.paramMap.get('id')!;
    this.jobService.getJob(jobid).subscribe(
      data => {
        this.clickedjob = data;

      }
    )
  }

  showprofil(usernamecv:string,idpostuler:number){

    this.profileservice.getactivecvbyuser(usernamecv).subscribe(datacv => {
      this.activecv = datacv;
      this.skills = this.activecv.skills.split(',');
      this.interest = this.activecv.interest.split(',');
      this.languages = this.activecv.langues.split(',');
    })

    this.postulerService.getbyid(idpostuler).subscribe(post => {
      this.clickedpostuler = post;
    
    })

  }

  getPdfUrl(p) {
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.authService.host + '/job/api/profilcvview/' + p.user.userid);
  }

  openCV(pl) {
    
    let url = this.authService.host + '/job/api/profilcv/' + pl?.user?.userid;
    let win = window.open(url, '_blank');
    win.focus();
  }

  /* updateSelected() {
    this.listpost.forEach(p => {
      if (p.selected) {
        p.etat = 1;
      }
    });
    this.postulerService.updatetat(this.listpost).subscribe(
      data => { console.log("updated") 
     
    })
  } */

 


  getselected(id:number) {
    this.selectedIds.push(id);
    this.testselected=2;
    console.log(this.selectedIds);
   
  }

  update(){
    this.postulerService.updateByIds(this.selectedIds).subscribe(data => {
      this.getpostulerbyjobid()
      this.getjobbyid()
     });
    console.log("selected", this.selectedIds);
    
  }
  



}
