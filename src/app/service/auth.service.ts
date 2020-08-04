import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { postLogin, respLogin } from '../interface/postLogin';
import { LoginComponent } from '../login/login.component';
import { Router, NavigationStart  } from '@angular/router';


interface myData{
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  cLogin : boolean ;

  private loggedInStatus = false

  constructor(private router: Router,private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }
  get isLoggedIn() {
    return this.loggedInStatus
  }

  getAdmin(username, password){
    return this.http.post<myData>('',{
      username,
      password
    })
  }

  postLoginStatus(username, password){
    this.http.post('https://cam-see-car.herokuapp.com/api/admin/login', {
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





  // checkusernameandpassword(uname: string, pwd : string)
  // {
  //   if(uname == "admin" && pwd =="admin123"){
  //     localStorage.setItem('username',"admin");
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }
}
