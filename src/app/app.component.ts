import { Component } from '@angular/core';
import { Router, NavigationStart  } from '@angular/router';
import { MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Project-CLP';

  showHead: boolean = false;


  constructor(private router: Router, private _snackBar: MatSnackBar) {
    // on route change to '/login', set the variable showHead to false
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/login' || event['url'] == 'login') {
            this.showHead = false;
          } 
          else {
            // console.log("NU")
            this.showHead = true;
          }
        }
      });
    }

    
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    openSnackBar() {
      this._snackBar.open('Logout Success', 'End now', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

    logoutLocal(){
      // this.openSnackBar()
      localStorage.removeItem('LoginAdmin')
      
    }


}

