import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, NavigationStart  } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MainDialogComponent } from '../main-dialog/main-dialog.component';
import { MatSort } from '@angular/material/sort';
import * as io from 'socket.io-client';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { Icarin } from '../interface/car-in';
import { numberCar } from '../interface/numCar';
import { ApiService } from '../service/api.service';
import { door4_in } from '../interface/door4_in';
import { door4_out } from '../interface/door4_out';
import { door5_in } from '../interface/door5_in';
import { door5_out } from '../interface/door5_out';

import { Observable } from 'rxjs';
import { ViewChildren, AfterViewInit, QueryList } from '@angular/core';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  safeURL;
  safeURL2;
  // videoURL = ;

  constructor( private apiService:ApiService, public dialog: MatDialog,  private _sanitizer: DomSanitizer) {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl("https://embed.api.video/live/li4WdATWfPU45OuyxBdmKCaG?autoplay=1&mute=1&enablejsapi=1");
    this.safeURL2 = this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/1vLdF8FP6CU?autoplay=1&mute=1&enablejsapi=1");
  }

  private socket;

  // _Icarin: Icarin[];
  // displayedColumns: string[] = ['id','first_name', 'last_name', 'email', 'avatar'];
  // dataSource;
  // dataSourceEmpty = [];

  // _numCar : numberCar[];
  // numCarColumns : string[] = ['number_car', 'door', 'gateway', 'datetime'];
  // numCarSource;
  // numCarSourceEmpty = [];

  _door4In : door4_in[];
  door4InColumns : string[] = ['img_car', 'img_licenplate', 'number_car', 'province', 'type_car', 'color', 'datetime'];
  door4InSource;
  door4InSourceEmpty = [];

  _door4Out : door4_out[];
  door4OutColumns : string[] = ['img_car', 'img_licenplate', 'number_car', 'province', 'type_car', 'color', 'datetime'];
  door4OutSource;
  door4OutSourceEmpty = [];

  _door5In : door5_in[];
  door5InColumns : string[] = ['img_car', 'img_licenplate', 'number_car', 'province', 'type_car', 'color', 'datetime'];
  door5InSource;
  door5InSourceEmpty = [];

  _door5Out : door5_out[];
  door5OutColumns : string[] = ['img_car', 'img_licenplate', 'number_car', 'province', 'type_car', 'color', 'datetime'];
  door5OutSource;
  doorOutSourceEmpty = [];

  INCAR = "เข้า";
  OUTCAR = "ออก";
  Door4 = ''
  getIdMainDialog;
  showSpinner = true;

  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true }) sort: MatSort;

  @ViewChild('TableD4InPaginator', {static: true}) tableD4InPaginator: MatPaginator;
  @ViewChild('TableD4OutPaginator', {static: true}) tableD4OutPaginator: MatPaginator;
  @ViewChild('TableD5InPaginator', {static: true}) tableD5InPaginator: MatPaginator;
  @ViewChild('TableD5OutPaginator', {static: true}) tableD5OutPaginator: MatPaginator;


  door4InSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.door4InSource.filter = filterValue.trim().toLowerCase();
  }
  door4OutSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.door4OutSource.filter = filterValue.trim().toLowerCase();
  }
  door5InSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.door5InSource.filter = filterValue.trim().toLowerCase();
  }
  door5OutSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.door5OutSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() { }
  
  ngOnInit() {
    
    // table
    this.getDoor4_IN()
    this.getDoor4_OUT()
    this.getDoor5_IN()
    this.getDoor5_OUT()
    
    // Socket IO
    this.getMainRealtime()
    
  }

  // Socket IO
  getMainRealtime() {
    this.apiService.getSocketData().subscribe((dataMain: any) => {
      // Door 4 IN
      if (dataMain.door == 'ประตู4' && dataMain.gateway == 'เข้า') {
        this._door4In.push(dataMain);
        this.door4InSource = new MatTableDataSource();
        this.door4InSource.data = this._door4In;
        this.door4InSource.paginator = this.tableD4InPaginator;
        this.door4InSource.sort = this.sort
        console.log('D4in GET SC',dataMain)
      }

      // Door 4 OUT
      if (dataMain.door == 'ประตู4' && dataMain.gateway == 'ออก') {
        this._door4Out.push(dataMain);
        this.door4OutSource = new MatTableDataSource();
        this.door4OutSource.data = this._door4Out;
        this.door4OutSource.paginator = this.tableD4InPaginator;
        this.door4OutSource.sort = this.sort
        console.log('D4out GET SC',dataMain)
      }

      // Door 5 IN
      if (dataMain.door == 'ประตู5' && dataMain.gateway == 'เข้า') {
        this._door5In.push(dataMain);
        this.door5InSource = new MatTableDataSource();
        this.door5InSource.data = this._door5In;
        this.door5InSource.paginator = this.tableD4InPaginator;
        this.door5InSource.sort = this.sort
        console.log('D5in GET SC',dataMain)
      }

      // Door 5 OUT
      if (dataMain.door == 'ประตู5' && dataMain.gateway == 'ออก') {
        this._door5Out.push(dataMain);
        this.door5OutSource = new MatTableDataSource();
        this.door5OutSource.data = this._door5Out;
        this.door5OutSource.paginator = this.tableD4InPaginator;
        this.door5OutSource.sort = this.sort
        console.log('D5outGET SC',dataMain)
      }
      console.log('D:',dataMain.door,'G:',dataMain.gateway,)

    },
      error => {
        this.showSpinner = true;
      }
    );
  }


  getDoor4_IN() {
    this.apiService.getDoor4_IN().subscribe((_car4IN : any) => {
      this._door4In = _car4IN['data'];
      this.door4InSource = new MatTableDataSource(this._door4In);
      if(this._door4In){
        this.showSpinner = false;
      }
      // this.door4InSource.sort = this.sort
      this.door4InSource.paginator = this.tableD4InPaginator;
      console.log(this._door4In)
    })
  }
  getDoor4_OUT() {
    this.apiService.getDoor4_OUT().subscribe((_car4OUT: any) => {
      this._door4Out = _car4OUT['data'];
      this.door4OutSource = new MatTableDataSource(this._door4Out);
      if(this._door4Out){
        this.showSpinner = false;
      }      
      // this.door4InSource.sort = this.sort
      this.door4OutSource.paginator = this.tableD4OutPaginator;
      console.log(this._door4Out)
    })
  }
  getDoor5_IN() {
    this.apiService.getDoor5_IN().subscribe((_car5IN : any) => {
      this._door5In = _car5IN['data'];
      this.door5InSource = new MatTableDataSource(this._door5In);
      if(this._door5In){
        this.showSpinner = false;
      }
      this.door5InSource.paginator = this.tableD5InPaginator;
      console.log(this._door5In)
    })
  }
  getDoor5_OUT() {
    this.apiService.getDoor5_OUT().subscribe((_car5OUT: any) => {
      this._door5Out = _car5OUT['data'];
      this.door5OutSource = new MatTableDataSource(this._door5Out);
      if(this._door5Out){
        this.showSpinner = false;
      }
      this.door5OutSource.paginator = this.tableD5OutPaginator;
      console.log(this._door5Out)
    })
  }


  getDoor4InByID(door4InID){
    // this.dialog.open(MainDialogComponent);
    // this.router.navigate(['/maindialog', door4InID])
    localStorage.setItem('idMainDialog', door4InID)
  }

}

