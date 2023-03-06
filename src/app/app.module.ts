import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CKEditor5 } from '@ckeditor/ckeditor5-build-classic';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { matStepperAnimations, MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AddCvComponent } from './components/add-cv/add-cv.component';
import { CvService } from './services/cv.service';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ShowcvComponent } from './components/showcv/showcv.component';
import { Ng5SliderModule } from 'ng5-slider';
import { DateAsAgoPipe } from './date-as-ago.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxLoadingModule } from 'ngx-loading';
import { ProfilcvComponent } from './components/profilcv/profilcv.component';
import { ShowprofilComponent } from './components/showprofil/showprofil.component';
import { JobpostComponent } from './components/jobpost/jobpost.component';
import { ShowpostulerComponent } from './components/showpostuler/showpostuler.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ListpostulerComponent } from './components/listpostuler/listpostuler.component';
import { ListfavorieComponent } from './components/listfavorie/listfavorie.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgToastModule } from 'ng-angular-popup';
import { NgxPaginationModule } from 'ngx-pagination';
import { AllcvComponent } from './components/allcv/allcv.component';

//ng add @angular/material@14.0.0
//npm install ngx-spinner@14 
// npm i ng5-slider
//npm i ngx-loading@14
//npm i ng2-pdf-viewer
//npm install jspdf
//npm i jspdf-autotable
//npm install --save html2canvas
//npm i ng-angular-popup
//npm install ngx-pagination
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    JobListComponent,
    AddJobComponent,
    AddCvComponent,
    ShowcvComponent,
    DateAsAgoPipe,
    ProfilcvComponent,
    ShowprofilComponent,
    JobpostComponent,
    ShowpostulerComponent,
    ListpostulerComponent,
    ListfavorieComponent,
    MenuComponent,
    AllcvComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    AppRoutingModule, HttpClientModule,
    ReactiveFormsModule, CommonModule,  CKEditorModule, BrowserAnimationsModule, MatChipsModule,
    MatFormFieldModule, BrowserAnimationsModule, MatStepperModule, MatInputModule, PdfViewerModule,
    MatButtonModule, CdkStepperModule, MatDatepickerModule, MatNativeDateModule, Ng5SliderModule, NgxSpinnerModule, NgxLoadingModule.forRoot({}), NgToastModule, NgxPaginationModule
  ],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
