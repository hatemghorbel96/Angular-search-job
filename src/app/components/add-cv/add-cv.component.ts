import { Education } from './../../model/education';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Cv } from 'src/app/model/cv';
import { CvService } from 'src/app/services/cv.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Experience } from 'src/app/model/experience';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AddCvComponent implements OnInit {
  cvForm: FormGroup;
  cv: Cv = new Cv();
  isLinear = true;
  skillsArray: string[] = [];
  langArray: string[] = [];
  interArray: string[] = [];
  experiences!: Experience[];
  educations!: Education[];
  
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  constructor(private cvService: CvService, private builder: FormBuilder, private toast: NgToastService) {
    this.isLinear = true;
   }

  ngOnInit(): void {
    this.isLinear = false;
    
  
  }

  

  Empregister = this.builder.group({
    basic: this.builder.group({
      nom: this.builder.control('', Validators.required),
      prenom: this.builder.control('', Validators.required),
      email: this.builder.control('', [Validators.required, Validators.email]),
      phone: this.builder.control('', Validators.required),
      address: this.builder.control('', Validators.required),
      linkedin: this.builder.control('', Validators.required),
      github: this.builder.control('', Validators.required),
      website: this.builder.control('', Validators.required),
      ville: this.builder.control('', Validators.required),
      birthday: ['', Validators.required],

    }),
    education: this.builder.array([]),
    exp: this.builder.array([]),

    skills: this.builder.group({
      skills: [''],
      langues: [''],
      interest: [''],
      poste: this.builder.control('', Validators.required),
      salairemin: this.builder.control('', Validators.required),
      description: this.builder.control('', Validators.required),
    })
  });

  get Basicform() {
    return this.Empregister.get("basic") as FormGroup;
  }
  get eduform() {
    return this.Empregister.get("education") as FormArray;
  }
 /*  get expform() {
    return this.Empregister.get("exp") as FormGroup;
  } */
  get expform() {
  
    return this.Empregister.get("exp") as FormArray;
  }


  get skillsform() {
    return this.Empregister.get("skills") as FormGroup;
  }

  
  HandleSubmit() {
    if (this.Empregister.valid) {
      console.log(this.Empregister.value);
      this.addnewcv();
    }
  }

  

  addnewcv() {

    let cv = new Cv();
    const experiences = this.experienceFormArray.controls.map((experienceFormGroup) => {
      const experience = new Experience();
      experience.postTitle = experienceFormGroup.value.postTitle;
      experience.enterpriseTitle = experienceFormGroup.value.enterpriseTitle;
      experience.datedebutExp = new Date(Date.parse(experienceFormGroup.value.datedebutExp));
      experience.datefinExp = new Date(Date.parse(experienceFormGroup.value.datefinExp));
      experience.description = experienceFormGroup.value.description;
      return experience;
      
    });
    const educations = this.educationFormArray.controls.map((educationFormGroup) => {
      const education = new Education();
      education.diplome = educationFormGroup.value.diplome;
      education.universite = educationFormGroup.value.universite;
      education.datedebutEtud = new Date(Date.parse(educationFormGroup.value.datedebutEtud));
      education.datefinEtud = new Date(Date.parse(educationFormGroup.value.datefinEtud));
     
      return education;

    });
    cv.educations = educations;
    cv.experiences = experiences;
    cv.nom = this.Empregister.value.basic.nom;
    cv.prenom = this.Empregister.value.basic.prenom;
    cv.email = this.Empregister.value.basic.email;
    cv.phone = this.Empregister.value.basic.phone;
    cv.address = this.Empregister.value.basic.address;
    cv.linkedin = this.Empregister.value.basic.linkedin;
    cv.github = this.Empregister.value.basic.github;
    cv.website = this.Empregister.value.basic.website;
    cv.ville = this.Empregister.value.basic.ville;
    cv.birthday = new Date(Date.parse(this.Empregister.value.basic.birthday));
   
    cv.poste = this.Empregister.value.skills.poste;
    cv.salairemin = parseInt(this.Empregister.value.skills.salairemin);
    cv.description = this.Empregister.value.skills.description;
    cv.skills = this.Empregister.value.skills.skills;
    cv.skills = this.skillsArray.join(",");

    cv.langues = this.Empregister.value.skills.langues;
    cv.langues = this.langArray.join(",");

    cv.interest = this.Empregister.value.skills.interest;
    cv.interest = this.interArray.join(",");

    this.cvService.addcv(cv).subscribe(
      j => {
        console.log(j);
        this.showSuccess()
      });
    this.showSuccess()
  }

  select(lang: string) {
    if (!this.skillsArray.includes(lang)) {
      this.skillsArray.push(lang);
    }
  }


  remove(lang: string): void {
    const index = this.skillsArray.indexOf(lang);

    if (index >= 0) {
      this.skillsArray.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

   
    if (value) {
      this.skillsArray.push(value);
      
    }

    event.input.value = '';
  }


  selectlang(lang: string) {
    if (!this.langArray.includes(lang)) {
      this.langArray.push(lang);
    }
  }


  removelang(lang: string): void {
    const index = this.langArray.indexOf(lang);

    if (index >= 0) {
      this.langArray.splice(index, 1);
    }
  }

  addLang(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.langArray.push(value);
    }
    event.input.value = '';
  }

  selectInter(lang: string) {
    if (!this.interArray.includes(lang)) {
      this.interArray.push(lang);
    }
  }


  removeInter(lang: string): void {
    const index = this.interArray.indexOf(lang);

    if (index >= 0) {
      this.interArray.splice(index, 1);
    }
  }

  addInter(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.interArray.push(value);
    }
    event.input.value = '';
  }

  
  get experienceFormArray(): FormArray {
    return this.Empregister.get('exp') as FormArray;
  }

  get educationFormArray(): FormArray {
    return this.Empregister.get('education') as FormArray;
  }

  addExperience(): void {
    
    
    this.experienceFormArray.push(this.createExperience());
  }

  createExperience(): FormGroup {
    return this.builder.group({
      postTitle: this.builder.control('', Validators.required),
      enterpriseTitle: this.builder.control('', Validators.required),
      datedebutExp: this.builder.control('', Validators.required),
      datefinExp: this.builder.control('', Validators.required),
      description: this.builder.control('', Validators.required),
    });
  }

  removeExperience(index: number): void {
    this.experienceFormArray.removeAt(index);
  }


  addEducation(): void {


    this.educationFormArray.push(this.createEducation());
  }

  createEducation(): FormGroup {
    return this.builder.group({
      diplome: this.builder.control('', Validators.required),
      universite: this.builder.control('', Validators.required),
      datedebutEtud: this.builder.control('', Validators.required),
      datefinEtud: this.builder.control('', Validators.required),
     
    });
  }

  removeEducation(index: number): void {
    this.educationFormArray.removeAt(index);
  }

  
  showSuccess() {
    this.toast.success({ detail: "SUCCESS", summary: "well done cv added with success", duration: 2000 });
  }
  


}
