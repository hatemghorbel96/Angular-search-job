import { Component, OnInit } from '@angular/core';
import { Cv } from 'src/app/model/cv';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProfilService } from 'src/app/services/profil.service';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-profilcv',
  templateUrl: './profilcv.component.html',
  styleUrls: ['./profilcv.component.css']
})
export class ProfilcvComponent implements OnInit {
  user!:User;
  activecv!: Cv;
  public skills: string[]=[];
  public interest: string[];
  public languages: string[];
  title = 'My CV';
  minititle = 'My CV';
 
  constructor(private profileservice: ProfilService, public authService: AuthService) { }

  ngOnInit(): void {
    document.title = this.title;
    this.getuser()
    this.cv()
     
  }

  getuser(){
    this.profileservice.getCurrentUser().subscribe(datauser => {
      this.user=datauser;
    })
  }

  cv(){
    this.profileservice.getactivecv().subscribe(datacv => {
      this.activecv = datacv;
      this.skills = this.activecv.skills.split(',');
      this.interest = this.activecv.interest.split(',');
      this.languages = this.activecv.langues.split(',');
    })
  }

  generatePDF() {
   /*  const element = document.getElementById('contentToConvert');
    const pdf = new jsPDF();
    pdf.html(element.innerHTML, {
      callback: function (pdf) {
        pdf.save();
      }
    }); */
    const content = document.getElementById("contentToConvert").innerHTML;
    const pdf = new jsPDF();
    pdf.html(content, {
      callback: function (pdf) {
        pdf.save("download.pdf");
      }
    });

  }

  public downloadPDF(): void {
    const data = document.getElementById('contentToConvert');
    html2canvas(data, { scale: 2 }).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Your-Resume.pdf');
    });
    /* html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('Your-Resume.pdf');
    }
    
    ); */
  }


}
