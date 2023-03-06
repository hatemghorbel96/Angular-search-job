import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/model/job';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-jobpost',
  templateUrl: './jobpost.component.html',
  styleUrls: ['./jobpost.component.css']
})
export class JobpostComponent implements OnInit {
  jobs!: Job[];
  constructor(private jobService: JobService, public authService: AuthService) { }

  ngOnInit(): void {
    this.jobService.getpostedJob().subscribe(j => {
      console.log(j);
      this.jobs = j;})
    this.getCurrentUser() 
 
  }

  getCurrentUser(): User {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));


    return currentUser;

  }

}
