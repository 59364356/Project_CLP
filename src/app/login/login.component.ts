import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart  } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { postLogin, respLogin } from '../interface/postLogin';
import { AuthGuard } from '../auth.guard';
import { Observable, throwError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {


  data:string;
  postLogin:postLogin;
  resultLogin: respLogin;
  checkStatus;


  // title = 'app';
  showHead: boolean = false;

  cLogin : boolean = false ;

  mUsername:string = "";
  mPassword:string = "";


  constructor(private router: Router, private apiService: ApiService, private authService: AuthService, private _httpClient: HttpClient) {
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

    // adminz12345  passwordz987654321
    postLoginStatus(){
      var username = (<HTMLInputElement>document.getElementById('username')).value;
      var password = (<HTMLInputElement>document.getElementById('password')).value;
      console.log(username, password);
      this._httpClient.post('https://cam-see-car.herokuapp.com/api/admin/login', {
        'username': username,
        'password':password
      }).subscribe(res =>{
        console.log('res: ',res);
        this.cLogin = true;
        
        // if(res){
        //   this.router.navigate(["/main"]);
        // }
        this.router.navigate(["/main"]);
        // window.location.reload();
        // window.alert('Login success')
        // console.log('res status', res.status)
        // if (res.status == 200){
        //   this.router.navigate(["/main"]);
        // }
      }, err =>{
        this.cLogin = false;
        console.log(err);
        window.alert('login false')
      });
    }





    loginAdmin(event) {
      event.preventDefault()
      const target = event.target
      const username = target.querySelector('#username').value
      const password = target.querySelector('#password').value

      this.authService.getAdmin(username, password).subscribe(data => {
        if(data.success) {
          this.router.navigate(['main'])
          this.authService.setLoggedIn(true)
        } else{
          window.alert(data.message)
        }
      })
      console.log(username, password)
    }

    // msg;
    // check(uname: string, p : string)
    // {
    //   var output = this.authService.checkusernameandpassword(uname, p);
    //   if(output == true)
    //   {
    //     this.router.navigate(['/main']);
    //   }
    //   else{
    //     this.msg ='Invalid username or password';
    //   }
    // }
    

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

 
  stch() {
    this.apiService.statusPost(this.resultLogin).subscribe(res => {
      console.log(res.status)
    })
  }

  checkLogin() {
    this.apiService.checkPost().subscribe((res) => {
      this.checkStatus = res.status;

      // if(res.status == 200) {
      //   this.router.navigate(["/main"]);
      //   console.log("res status",res.status);
      // }
      // if(res.status== 204){
      //   console.log("res 204", res.status)
      // }
      // else{
      //   alert("post ERROR")
      //   console.log("res status",res.status);
      // }
    });
  }

  sendLogin() {
    this.postLogin = new postLogin();
    this.postLogin.username = "adminz12345";
    this.postLogin.password = "passwordz987654321";
    this.apiService.addPost(this.postLogin).subscribe((res:respLogin) => {
      // if(res.status == 200){
      //   console.log("show status", res.status)
      // }

      // if(this.mUsername == this.postLogin.username && this.mPassword == this.postLogin.password){
      //   this.checkLogin();
      //   console.log(this.postLogin.username);
      //   console.log(this.postLogin.password);
        
      // }
      // else{
      //   alert('ERRORRRRR !!!!')
      // }
      // this.resultLogin = res;
      // console.log(this.resultLogin);
      // this.data = this.resultLogin.username + '-' + this.resultLogin.password;
    });
  }




}
