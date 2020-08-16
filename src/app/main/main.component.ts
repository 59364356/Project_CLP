import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, NavigationStart  } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Icarin } from '../interface/car-in';
import { numberCar } from '../interface/numCar';
import { ApiService } from '../service/api.service';
import { door4_in } from '../interface/door4_in';
import { door4_out } from '../interface/door4_out';
import { door5_in } from '../interface/door5_in';
import { door5_out } from '../interface/door5_out';
import { MainDialogComponent } from '../main-dialog/main-dialog.component';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';

import { ViewChildren, AfterViewInit, QueryList } from '@angular/core';

// const Icarin = [

//   {title: 'No',_data: 'id'}, 
//   {title: 'No',_data: 'first_name'}, 
//   {title: 'No',_data: 'last_name'}, 
//   {title: 'No',_data: 'email'}, 
//   {title: 'No',_data: 'avatar'},

//   // {id : number, first_name: string, last_name: string, email: string, avatar: string},
//   // { id: any; first_name: any; last_name: any; email: any; avatar: any; }
//   // {No: id, First Name: first_name, Last Name: last_name, Email: email, Avatar: avatar}
// ];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private apiService:ApiService, public dialog: MatDialog) {
  }

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


  openDialog() {
    this.dialog.open(MainDialogComponent);
  }

  


  ngOnInit() {
    
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.getIcarin()
    // this.getnumCar()

    this.getDoor4_IN()
    this.getDoor4_OUT()
    this.getDoor5_IN()
    this.getDoor5_OUT()

    // this.getTest()
    // console.log(Math.max(1,2,6,8,4,10,0,2));
    // console.log(Math.min(1,2,6,8,4,10,0,2));
    // return this.apiService.getIcarin()
    //   .subscribe(data => {
    //     console.log(data.data)
    //     this._Icarin = data
    //   })
  }


  getDoor4_IN() {
    this.apiService.getDoor4_IN().subscribe((_car4IN : any) => {
      this._door4In = _car4IN['data'];
      this.door4InSource = new MatTableDataSource(this._door4In);
      if(this._door4In){
        this.showSpinner = false;
      }
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

  openMainDialog(data) {  
    debugger;  
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;  
    dialogConfig.position = {  
        'top': '100px',  
        'left': '500px'  
    };  
    dialogConfig.width = '500px';  
    dialogConfig.height = '500px';
    // this.getIdMainDialog = localStorage.getItem('idMainDialog')
    dialogConfig.data = {  
        mainId: data._id  
    };  
    this.dialog.open(MainDialogComponent, dialogConfig);  
} 

  // getIcarin() {
  //   this.apiService.getIcarin().subscribe((_data : any) => {
  //     this._Icarin = _data['data'];
  //     this.dataSource = new MatTableDataSource(this._Icarin);
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;
  //     console.log(this._Icarin)
  //   });
  // }

  // getnumCar() {
  //   this.apiService.getnumCar().subscribe((_data : any) => {
  //     this._numCar = _data['data'];
  //     this.numCarSource = new MatTableDataSource(this._numCar);
  //     this.numCarSource.sort = this.sort;
  //     this.numCarSource.paginator = this.paginator;
  //     console.log(this._numCar)
  //   });
  // }

  // getTest() {
  //   this.apiService.getTest().subscribe((_test: any) =>{
  //     this.test = _test;
  //   })
  // }

    // gettt() {
  //   this.apiService.getIcarin().subscribe((_data : any) => {
  //   this._Icarin = _data['data'];
  //   this.dataSource = new MatTableDataSource<Icarin>(ELEMENT_DATA);
  //   this.dataSource.sort = this.sort;
  //   console.log(this._Icarin)
  //   });

  // }

  // getApiCarIn(){
  //   this.apiService.getIcarin()
  //   .subscribe((_data : any) => {
  //     this._Icarin = _data['data']
  //     console.log(this._Icarin)
  //   });
  // }

}

