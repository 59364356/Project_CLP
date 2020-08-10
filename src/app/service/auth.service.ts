import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { postLogin, respLogin } from '../interface/postLogin';
import { LoginComponent } from '../login/login.component';
import { Router, NavigationStart  } from '@angular/router';
import { tap, map } from 'rxjs/operators';

interface myData{
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 constructor(private router: Router,private http: HttpClient) { }

  cLogin : boolean ;

  public loggedInStatus = false

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }
  get isLoggedIn() {
    return this.loggedInStatus
  }


  // login new: string: string
  getAdminDetails(username, password){
    return this.http.post<myData>('https://cam-see-car.herokuapp.com/api/admin/login',{
      username,
      password
    });
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


  login(username: string, password: string) {
    return this.http.post<any>('https://cam-see-car.herokuapp.com/api/admin/login', { username: username, password: password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
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
