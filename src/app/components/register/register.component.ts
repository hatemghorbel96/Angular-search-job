import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser = new User();
  passwordVisible = false;
  imgURL: any; public imagePath;
  constructor(public userService: AuthService, private toast: NgToastService) { }

  ngOnInit(): void {
   
    console.log("init",this.passwordVisible);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    console.log("taggle", this.passwordVisible);
  }

  addUser() {


    let formData = new FormData();
    formData.append('username', this.newUser.username);
    formData.append('email', this.newUser.email);
    formData.append('type', this.newUser.type.toString());
    formData.append('password', this.newUser.password);
    formData.append('img', this.img);
    formData.append('image', this.image);
    formData.append('description', this.newUser.description);
    formData.append('thesize', this.newUser.thesize);
    formData.append('category', this.newUser.category);
    formData.append('firstname', this.newUser.firstname);
    formData.append('lastname', this.newUser.lastname);
    formData.append('facebooklink', this.newUser.facebooklink);
    formData.append('linkedinlink', this.newUser.linkedinlink);
    this.userService.register(formData).subscribe(
      u => {
        console.log(u); 
        this.showSuccess(this.newUser.username)
        setTimeout(() => {
          window.location.href = "/login"
        }, 2000);
      });
    
    this.showSuccess(this.newUser.username)
    setTimeout(() => {
      window.location.href = "/login"
    }, 3000);
  }

  img: any;
  selectImage(event) {

    this.img = event.target.files[0];
    console.log(this.img);
    // preview img
    var reader = new FileReader();


    
    this.imagePath = this.img;
    reader.readAsDataURL(this.img);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  image: any;
  selectcv(eventt) {

    this.image = eventt.target.files[0];
    console.log(this.image);
  }
  h: any = this.newUser.username;
  showSuccess(h) {
    this.toast.success({ detail: "SUCCESS", summary: `welcome ${h} u will redirect to login page`, duration: 5000 });
  }

 

}
