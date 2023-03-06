import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/model/job';
import { AuthService } from 'src/app/services/auth.service';
import { JobService } from 'src/app/services/job.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LabelType, Options } from 'ng5-slider';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulerService } from 'src/app/services/postuler.service';
import { Postuler } from 'src/app/model/postuler';
import { User } from 'src/app/model/user';
import { Cv } from 'src/app/model/cv';
import { ProfilService } from 'src/app/services/profil.service';
@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs!: Job[];
  clickedjob = new Job();
  click:number;
 /*  valuemin = '0';
  valuemax = ''; */
  valuemin =0
  valuemax=0
  max!:any;
  locations = new Set();
  filterslocation: string[] = []
  test!: any[]
  filtersType: string[] = []
  filtersTypeTable = new Set();
  filterssemulaire!:number;
  filtersSearch: string[] = []
  // titles
  selectedFilterType = "Job type";
  selectedlocation = "Location";
  selectedDate="Job date";
  public loading = false;
  days: number;
  initialValue = 60;
  newpostule = new Postuler();
  refresh: boolean = true;
  activecv!: Cv;
  public skills: string[] = [];
  public interest: string[];
  public languages: string[];
  currentPage: number = 1;
  itemsPerPage = 5;
  constructor(private jobService: JobService, public authService: AuthService, public sanitizer: DomSanitizer, private spinner: NgxSpinnerService
    , private postulerService: PostulerService, private profileservice: ProfilService) { 
  
  }
 
  ngOnInit(): void {
    this.jobsfunction()
    this.cv()
    this.filterssemulaire=0;
  }

  cv() {
    this.profileservice.getactivecv().subscribe(datacv => {
      this.activecv = datacv;
      this.skills = this.activecv.skills.split(',');
      this.interest = this.activecv.interest.split(',');
      this.languages = this.activecv.langues.split(',');
    })
  }

  jobsfunction(){
    
    this.jobService.getalljobs().subscribe(j => {
      console.log(j);
      this.jobs = j;
      this.jobs.sort((a, b) => {
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
      });
      for (let v of this.jobs) {
        this.locations.add(v.localisation);
      }
      for (let v of this.jobs) {
        this.filtersTypeTable.add(v.jobtype);
      }
      this.max = this.jobs.reduce((prev, current) => {
        return (prev.maxsalary > current.maxsalary) ? prev : current
      }).maxsalary;
      console.log(this.max);
      console.log('listjobs: this.max', this.max);
      this.updateOptions();
    });

    this.click = 1;
    console.log('ngOnInit: this.max', this.max);
  }

  postuler(id:number){
    this.postulerService.jobpostuler(this.newpostule,id).subscribe(data =>
     console.log(data) )
  }

  filterJobs(days: number) {
    const now = new Date().getTime();
    this.days = days;
   
    const filteredJobs = this.jobs.filter(job => {
      const diffTime = Math.abs(now - new Date(job.dateCreated).getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= days;
    });
    this.jobs = filteredJobs;
  }

  reset() {
    this.days = this.initialValue;
  }
   
  filterMostRecent() {
    this.days = null;
    // Implement your logic here to filter the most recent jobs based on the current state of your component
  }

  updateOptions() {
    console.log('updateOptions: this.max', this.max);
    this.options = {
      floor: 0,
      ceil: this?.max,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return '<b>Min Salaire:</b> ' + this.valuemin + ' DT';
          case LabelType.High:
            return '<b>Max Salaire:</b> ' + this.valuemax + ' DT';
          default:
            return '$' + value;
        }
      }
    };
  }


  options: Options = {
    floor: 0,
    ceil: 1800,
    
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min Salaire:</b> ' + this.valuemin + ' DT';
        case LabelType.High:
          return '<b>Max Salaire:</b> ' + this.valuemax + ' DT';
        default:
          return '$' + value;
      }
    }
  };

  getbyid(idjob){
    //const idjob: number = +this.route.snapshot.paramMap.get('id')!;
    this.jobService.getJob(idjob).subscribe(
      data => {
        this.clickedjob = data;
        this.click=2
      }
    )
  }

  handleSearchprice() {

    /* const max: string = this.valuemax;
    const min: string = this.valuemin; */
    /* console.log("max:",max);
    console.log("min:", min) */
    console.log("max:", this.valuemax);
    console.log("min:", this.valuemin)
    this.jobService.searchByPrix(this.valuemax, this.valuemin).subscribe(
      data=> {
        this.jobs = data;
        this.redirectWithLoading();
      }
    )
  }

  getJobsToDisplay() {
    
    let filteredJobs = this.jobs;
    
    if (this.filterslocation.length > 0) {
      filteredJobs = filteredJobs.filter(vol => this.filterslocation.includes(vol.localisation.toString()));
    }
    if (this.filtersType.length > 0) {
      filteredJobs = filteredJobs.filter(vol => this.filtersType.includes(vol.jobtype.toString()));
    }
    if (this.filtersSearch.length > 0) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(this.filtersSearch.toString().toLowerCase()) ||
        job.description.toLowerCase().includes(this.filtersSearch.toString().toLowerCase())
      );
    } if (this.days > 0) {
      const now = new Date().getTime();
      filteredJobs = filteredJobs.filter(job => {
        const diffTime = Math.abs(now - new Date(job.dateCreated).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= this.days;
      });}

    if (this.filterssemulaire > 0) {
      filteredJobs = this.test
  }

    
    return filteredJobs;
  }



  ModifyFilterdlocationn(filter: any) {
    this.filterslocation = [filter];
    this.selectedlocation = filter;
  }

  resetFilters() {
    this.filterslocation = [];
    this.selectedlocation = "Location";
  }


  ModifyFilterdtype(filter: any) {
    this.filtersType = [filter];
    this.selectedFilterType = filter;
  }

  resetFiltersType() {
    this.filtersType = [];
    this.selectedFilterType = "Job type";
  }

  ModifyFilterdfiltersSearch(filter: any) {
    this.filtersSearch = [filter];
    this.redirectWithLoading();
  }


  sumilaire(n:number) {
    this.filterssemulaire = n;

    let tempFilteredJobs = [];
    for (let job of this.jobs) {
      let match = false;
      for (let skill of this.skills) {
        if (job.title.toLowerCase().includes(skill.toLowerCase()) ||
          job.description.toLowerCase().includes(skill.toLowerCase())) {
          match = true;
          break;
        }
      }
      if (match) {
        tempFilteredJobs.push(job);
      }
    }

    this.test = tempFilteredJobs;
    this.redirectWithLoading();
  }

  annuler(){
    this.filterssemulaire = 0;
  }

  redirectWithLoading() {

    
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      
    }, 1000);
  }
  // favorit
  loggedUserfavorit(job: Job) {
    return job.favorits.some(f => f.user.username === this.authService.loggedUser);
  }

  favoritadd(id: number) {
    this.jobService.addfavorit(id).subscribe(
      (data) => {
        console.log(data);
        this.jobsfunction()

    
     
      }),
      err => {
        console.log("Error");
   
      }
  }

  annulefavorit(id: number) {
    this.jobService.annulefavorit(id).subscribe(
      (data) => {
        console.log(data);
        this.jobsfunction()
      }),
      err => {
        console.log("Error");
       
      } 
  
  }

}
