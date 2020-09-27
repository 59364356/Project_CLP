import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { IcarOut } from '../interface/carOut';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { history_car } from '../interface/history_car';
import { MainDialogComponent } from '../main-dialog/main-dialog.component';
import { HistoryDialogComponent } from '../history-dialog/history-dialog.component';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import io from 'socket.io-client';
import { delay } from 'rxjs/operators';
// import { Socket } from 'dgram';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {


  _hisCar : history_car[];
  hisCarColumns : string[] = ['img_car', 'img_licenplate', 'number_car', 'gateway', 'door', 'province', 'type_car', 'color', 'datetime', 'user_name'];
  hisCarSource;
  hisCarSourceEmpty = [];

  INCAR = "เข้า";
  OUTCAR = "ออก";
  noDetect = "ไม่ทราบ";
  showSpinner = false;

  socket = io('https://cam-see-car.herokuapp.com');

  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true }) sort: MatSort;

  hisCarSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.hisCarSource.filter = filterValue.trim().toLowerCase();
  }  

  constructor(private apiService: ApiService, public dialog: MatDialog, private _httpClient: HttpClient) { }


  ngOnInit() {
    this.showSpinner = true;
    this.getHisCar();
    this.getHisRealtime();
 
  
  }

  getLocalHis(idHisID){
    localStorage.setItem('idHisDialog', idHisID)
  }
  getIdHis(idHis){
    localStorage.setItem('idImgMain', idHis)
    // localStorage.removeItem('idHisDialog')
  }

  openDialog() {
    this.dialog.open(MainDialogComponent);
  }
  openDialogUser() {
    this.dialog.open(HistoryDialogComponent);
  }


  getHisRealtime() {
    this.apiService.getSocketData().subscribe(async (data: any) => {
      if (data) {
        this._hisCar.push(data);
        this.hisCarSource = new MatTableDataSource();
        this.hisCarSource.data = this._hisCar;
        this.hisCarSource.paginator = this.paginator;
        this.hisCarSource.sort = this.sort
        console.log('GET SC',data)
      }
    },
      error => {
        this.showSpinner = true;
      }
    );
  }
    
  getHisCar() {
    this.apiService.getHisCar().subscribe((_data: any) =>{
      this._hisCar = _data['data'];
      this.hisCarSource = new MatTableDataSource(this._hisCar);
      this.hisCarSource.paginator = this.paginator;
      console.log(this._hisCar);
      if(this._hisCar){
        this.showSpinner = false;
      }
    }, err =>{
      console.log(err);
    })
  }

  // getHisCar() {
  //   this._httpClient.get('https://cam-see-car.herokuapp.com/api/history_car/all').subscribe((_data: any) =>{
  //     this._hisCar = _data['data'];
  //     this.hisCarSource = new MatTableDataSource(this._hisCar);
  //     this.hisCarSource.paginator = this.paginator;
  //     console.log(this._hisCar);
  //     if(this._hisCar){
  //       this.showSpinner = false;
  //     }
  //   }, err =>{
  //     console.log(err);
  //   })
  // }
  
}
