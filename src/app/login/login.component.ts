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

  submitted : boolean = false ;

  mUsername:string = "";
  mPassword:string = "";
  localLogin;


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


    // login new  adminz12345  passwordz987654321
    loginAdmin() {
      // console.log("ssss")
      // event.preventDefault()
      // const target = event.target
      // const username = target.querySelector('#username').value
      // const password = target.querySelector('#password').value
      var username = (<HTMLInputElement>document.getElementById('username')).value;
      var password = (<HTMLInputElement>document.getElementById('password')).value;

      this.authService.getAdminDetails(username, password).subscribe(data => {
        // this.router.navigate(["/main"]);
        // console.log('seccess')
        if(data.success) {
          this.router.navigate(['/main'])
          this.authService.setLoggedIn(true)
          console.log('success')
          console.log(this.authService.setLoggedIn(true))
        } else{
          // this.router.navigate(['login'])
          window.alert("ERROR " + data.message)
        }
      }, err =>{
        console.log("ERROR!! ",err);
        window.alert('login false')
      });
      console.log(username, password)
    }


  //   onSubmit() {
  //     this.submitted = true;

  //     // stop here if form is invalid
  //     if (this.loginForm.invalid) {
  //         return;
  //     }

  //     this.loading = true;
  //     this.authenticationService.login(this.f.username.value, this.f.password.value)
  //         .pipe(first())
  //         .subscribe(
  //             data => {
  //                 this.router.navigate([this.returnUrl]);
  //             },
  //             error => {
  //                 this.alertService.error(error);
  //                 this.loading = false;
  //             });
  // }


    localC(){
      localStorage.getItem('LoginAdmin')
      this.localLogin = localStorage.getItem('LoginAdmin')
      console.log('GET LOCAL ',this.localLogin)
    }


    // adminz12345  passwordz987654321
    postLoginStatus(){
      var username = (<HTMLInputElement>document.getElementById('username')).value;
      var password = (<HTMLInputElement>document.getElementById('password')).value;
      // console.log(username, password);
      this._httpClient.post('https://cam-see-car.herokuapp.com/api/admin/login', {
        'username': username,
        'password':password
      }).subscribe(res =>{
        console.log('res: ',res);
        this.authService.cLogin = true;

        this.router.navigate(["/main"]);
        localStorage.setItem('LoginAdmin',JSON.stringify(res))
        // this.localLogin = localStorage.setItem('LoginAdmin',password)
        // console.log('LOCAL ',this.localLogin)
        console.log(username, password)
        console.log('LOGIN SUCCESS')
        // window.location.reload();
        // window.alert('Login success')
        // console.log('res status', res.status)
        // if (res.status == 200){
        //   this.router.navigate(["/main"]);
        // }
      }, err =>{
        this.authService.cLogin = false;
        console.log(err);
        console.log('LOGIN FALSE')
        window.alert('login false')
      });
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
