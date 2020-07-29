import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { postLogin, respLogin } from '../interface/postLogin';
import { LoginComponent } from '../login/login.component';


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

  constructor(private http: HttpClient) { }

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
