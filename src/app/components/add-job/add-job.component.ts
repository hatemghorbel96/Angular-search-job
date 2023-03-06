import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/model/job';
import { JobService } from 'src/app/services/job.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
//npm install ckeditor5-angular
//npm install @ckeditor/ckeditor5-build-classic
//npm install --save @ckeditor/ckeditor5-angular @ckeditor/ckeditor5-build-classic


@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  newjob = new Job();
  public editor = ClassicEditor;
  public editorConfig = {
    toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
      ]
    }
  };
  availableLangue = ['French', 'English', 'German', 'Italian'];
  selectedLangue = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private jobService: JobService) { }

  ngOnInit(): void {
  }

  addnewjob() {
    this.newjob.langue = this.selectedLangue.join(",");
    this.jobService.addjob(this.newjob).subscribe(
      j => {
        console.log(j);
      });
  }



  select(lang: string) {
    if (!this.selectedLangue.includes(lang)) {
      this.selectedLangue.push(lang);
    }
  }

/*   remove(lang: string) {
    this.selectedLangue = this.selectedLangue.filter(l => l !== lang);
  } */
  remove(lang: string): void {
    const index = this.selectedLangue.indexOf(lang);

    if (index >= 0) {
      this.selectedLangue.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our langue
    if (value) {
      this.availableLangue.push(value);
      this.selectedLangue.push(value);
    }

    // Clear the input value
    event.input.value = '';
  }

  

}








  
