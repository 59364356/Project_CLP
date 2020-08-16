import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart  } from '@angular/router';
import { ApiService } from '../service/api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { UserContAdmin } from '../interface/user-contact-admin';
import { loginAdmin } from '../interface/login_admin';

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.scss']
})
export class HistoryDialogComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService, public dialog: MatDialog, private _httpClient: HttpClient) { }

  url = 'https://cam-see-car.herokuapp.com/api/admin/user_contact'

  getHisID = localStorage.getItem('idHisDialog')
  getAdminID = localStorage.getItem('LoginAdmin')

  logAdmin : loginAdmin[];
  contAdmin : UserContAdmin[];
  showSpinner = true;
  buttonClose = false;

  ngOnInit(){
    console.log('ID HIS ', this.getHisID)
    console.log('ID Ad ', this.getAdminID)
    this.postUserConAdmin()
  }

  getLocalHis(){
    // getHisDL = localStorage.getItem('idHisDialog')
  }

  postUserConAdmin(){
    var HisID = localStorage.getItem('idHisDialog')
    var AdminID = localStorage.getItem('LoginAdmin')

    this._httpClient.post('https://cam-see-car.herokuapp.com/api/admin/user_contact', {
    'admin_id': AdminID,  
    'user_id': HisID
    }).subscribe(res =>{
      this.contAdmin = res['data'];
      if(this.contAdmin){
        this.showSpinner = false;
        this.buttonClose = true;
      }
      console.log('RES ', res)
      console.log('CON ', this.contAdmin)
    }, err =>{
      console.log(err);

    });
  }
  

}
