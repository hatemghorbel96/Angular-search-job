import { Component, OnInit } from '@angular/core';
import { Postuler } from 'src/app/model/postuler';
import { AuthService } from 'src/app/services/auth.service';
import { PostulerService } from 'src/app/services/postuler.service';

@Component({
  selector: 'app-listpostuler',
  templateUrl: './listpostuler.component.html',
  styleUrls: ['./listpostuler.component.css']
})
export class ListpostulerComponent implements OnInit {
  title = 'My Post List';
  minititle = 'My Post List';
  listpost: Postuler[];
  attente :number;
  consulter:number;
  constructor(public authService: AuthService, private postulerService: PostulerService) { }

  ngOnInit(): void {
    document.title = this.title;
    this.getpostulerbyjobid()
  }


  getpostulerbyjobid() {
   
    this.postulerService.mypostulerlist().subscribe(
      data => {
        this.listpost = data;
        this.attente = this.listpost.filter(item=>item.etat===0).length
        this.consulter = this.listpost.filter(item => item.etat === 1).length
      }
    )
  }

 

}
