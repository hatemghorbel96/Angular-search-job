import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Favorit } from 'src/app/model/favorit';
import { AuthService } from 'src/app/services/auth.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-listfavorie',
  templateUrl: './listfavorie.component.html',
  styleUrls: ['./listfavorie.component.css']
})
export class ListfavorieComponent implements OnInit {
  title = 'Saved Jobs';
  minititle = 'Saved Jobs';
  fav!:Favorit[]
  constructor(private jobService: JobService, public authService: AuthService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    document.title = this.title;
    this.listfav()
    
  }

  listfav() {

    this.jobService.myfavorit().subscribe(
      data => {
        this.fav = data;
        
      }
    )
  }

}
