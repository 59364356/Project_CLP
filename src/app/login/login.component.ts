import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart  } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { postLogin, respLogin } from '../interface/postLogin';
import { loginAdmin } from '../interface/login_admin';
import { AuthGuard } from '../auth.guard';
import { Observable, throwError, of } from 'rxjs';
import { MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { NgxSpinnerService } from "ngx-spinner";

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

  logAdmin: loginAdmin[];


  // title = 'app';
  showHead: boolean = false;

  submitted : boolean = false ;

  mUsername:string = "";
  mPassword:string = "";
  localLogin;


  constructor(private router: Router, private apiService: ApiService, private authService: AuthService, 
              private _httpClient: HttpClient, private _snackBar: MatSnackBar, private spinner: NgxSpinnerService) {
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

    ngOnInit(){
      this.checkLocalLogin()
    }

    checkLocalLogin(){
      if(localStorage.getItem('LoginAdmin')){
        this.router.navigate(['/main'])
      }
      this.router.navigate(['/login'])
    }


    // adminz12345  passwordz987654321
    postLoginStatus(){
      var username = (<HTMLInputElement>document.getElementById('username')).value;
      var password = (<HTMLInputElement>document.getElementById('password')).value;
      // console.log(username, password);
      this.spinner.show();
      this._httpClient.post('https://cam-see-car.herokuapp.com/api/admin/login', {
        'username': username,
        'password':password
      }).subscribe(res =>{
        console.log('res: ',res);

        if(res){
          this.spinner.hide();
        }
        
        this.router.navigate(["/main"]);
        localStorage.setItem('LoginAdmin',(res['data'][0]['_id']))
        this.openSnackBar()
        console.log('LOGIN SUCCESS')
 
      }, err =>{
        console.log(err);
        console.log('LOGIN FALSE')
        window.alert('LOGIN FALSE')
        this.spinner.hide();
      });
    }
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    openSnackBar() {
      this._snackBar.open('Login Success', 'End now', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
    


    // // login new  adminz12345  passwordz987654321
    // loginAdmin() {
    //   var username = (<HTMLInputElement>document.getElementById('username')).value;
    //   var password = (<HTMLInputElement>document.getElementById('password')).value;

    //   this.authService.getAdminDetails(username, password).subscribe(data => {
    //     if(data.success) {
    //       this.router.navigate(['/main'])
    //       this.authService.setLoggedIn(true)
    //       console.log('success')
    //       console.log(this.authService.setLoggedIn(true))
    //     } else{
    //       window.alert("ERROR " + data.message)
    //     }
    //   }, err =>{
    //     console.log("ERROR!! ",err);
    //     window.alert('login false')
    //   });
    //   console.log(username, password)
    // }

}
