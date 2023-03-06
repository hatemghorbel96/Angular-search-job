import { ListfavorieComponent } from './components/listfavorie/listfavorie.component';
import { ListpostulerComponent } from './components/listpostuler/listpostuler.component';
import { ShowprofilComponent } from './components/showprofil/showprofil.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { AddCvComponent } from './components/add-cv/add-cv.component';
import { ShowcvComponent } from './components/showcv/showcv.component';
import { ProfilcvComponent } from './components/profilcv/profilcv.component';
import { JobpostComponent } from './components/jobpost/jobpost.component';
import { ShowpostulerComponent } from './components/showpostuler/showpostuler.component';
import { AllcvComponent } from './components/allcv/allcv.component';

const routes: Routes = [
  { path: "home", component: HomeComponent, pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "inscrire", component: RegisterComponent },
  { path: "addjob", component: AddJobComponent },
  { path: "joblist", component: JobListComponent },
  { path: "addcv", component: AddCvComponent },
  { path: "showcv", component: ShowcvComponent },
  { path: "mycv", component: ProfilcvComponent },
  { path: "postedjobs", component: JobpostComponent },
  { path: "mypostlist", component: ListpostulerComponent },
  { path: "saved", component: ListfavorieComponent },
  { path: "cvs", component: AllcvComponent },
  { path: "userpostuler/:id", component: ShowpostulerComponent },
  { path: 'showprofil/:username', component: ShowprofilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
