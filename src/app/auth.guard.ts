import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router, NavigationStart  } from '@angular/router';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private _router: Router, private authService: AuthService){}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // return false;
      // return this.authService.isLoggedIn;
      
      if (localStorage.getItem('LoginAdmin')) {
        // logged in so return true
        return true;
      }

      // not logged in so redirect to login page with the return url
      this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;


      // if (this.authService.cLogin == true){
      //   return true
      // }
      // else{
      //   this._router.navigate(['/login'])
      //   return false
      // }


    //   if (localStorage.getItem('currentUser')) {
    //     // logged in so return true
    //     return true;
    // }

    // // not logged in so redirect to login page with the return url
    // this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    // return false;



      // if(this.loginCom.cLogin == true){
      //   // this._router.navigate(['main'])
      //   return true
        
      // }
      // if(this.loginCom.cLogin == false){
      //   this._router.navigate(['login'])
      //   return false
      // }


    // return this._authguard.isLoggedIn;
          // //debugger
          // if(this._authguard.isLoggedIn) {
          //   return true
          // }
          // return this.user.isLoggedIn().pipe(map(res => {
          //   if(res.status) {
          //     this._authguard.setLoggedIn(true)
          //     return true
          //   } else {
          //     this._router.navigate(['login'])
          //     return false
          //   }
          // }))
  }

  // canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
  // }
  
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean  {
  //     if(localStorage.getItem('username')!= null){
  //       return true;
  //     }
  //     else{
  //       this._router.navigate(['/login']);
  //       return false;
  //     }
  // }
  
  // , CanActivateChild, CanDeactivate<unknown>, CanLoad 
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  
  // canActivateChild(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canDeactivate(
  //   component: unknown,
  //   currentRoute: ActivatedRouteSnapshot,
  //   currentState: RouterStateSnapshot,
  //   nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
}
