import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart  } from '@angular/router';
import { ApiService } from '../service/api.service';
import { postLogin, respLogin } from '../interface/postLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  data:string;
  postLogin:postLogin;
  resultLogin: respLogin;







  // title = 'app';
  showHead: boolean = false;

  mUsername:string = "";
  mPassword:string = "";

  constructor(private router: Router, private apiService:ApiService) {
    // on route change to '/login', set the variable showHead to false
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/login') {
            this.showHead = false;
          } else {
            // console.log("NU")
            this.showHead = true;
          }
        }
      });
    }

  onClickLogin(){
    if (this.mUsername == "" && this.mPassword == "")
    {
      this.router.navigate(["/main"]);
      // window.alert("Login Success");
    }
    else
    {
      window.alert("Login Failed")
    }

  }

  ngOnInit(): void {
  }

  sendLogin() {
    this.postLogin = new postLogin();
    this.postLogin.username = "test";
    this.postLogin.password = "test";
    this.apiService.addPost(this.postLogin).subscribe((res : respLogin) => {
      this.resultLogin = res;
      console.log(this.resultLogin);
      this.data = this.resultLogin.username + '-' + this.resultLogin.password;
    });
  }

}
