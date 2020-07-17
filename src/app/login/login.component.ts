import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart  } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // title = 'app';
  showHead: boolean = false;

  mUsername:string = "";
  mPassword:string = "";

  constructor(private router: Router) {
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

}
