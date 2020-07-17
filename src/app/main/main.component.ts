import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Icarin } from '../interface/car-in';
import { numberCar } from '../interface/numCar';
import { ApiService } from '../service/api.service';
import { door4_in } from '../interface/door4_in';
import { door4_out } from '../interface/door4_out';
import { door5_in } from '../interface/door5_in';
import { door5_out } from '../interface/door5_out';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';


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
export class MainComponent implements OnInit {

  _Icarin: Icarin[];
  displayedColumns: string[] = ['id','first_name', 'last_name', 'email', 'avatar'];
  dataSource;
  dataSourceEmpty = [];

  _numCar : numberCar[];
  numCarColumns : string[] = ['number_car', 'door', 'gateway', 'datetime'];
  numCarSource;
  numCarSourceEmpty = [];

  _door4In : door4_in[];
  door4InColumns : string[] = ['number_car', 'door', 'gateway', 'datetime'];
  door4InSource;
  door4InSourceEmpty = [];

  _door4Out : door4_out[];
  door4OutColumns : string[] = ['number_car', 'door', 'gateway', 'datetime'];
  door4OutSource;
  door4OutSourceEmpty = [];

  _door5In : door5_in[];
  door5InColumns : string[] = ['number_car', 'door', 'gateway', 'datetime'];
  door5InSource;
  door5InSourceEmpty = [];

  _door5Out : door5_out[];
  door5OutColumns : string[] = ['number_car', 'door', 'gateway', 'datetime'];
  door5OutSource;
  doorOutSourceEmpty = [];

  INCAR = "เข้า";
  OUTCAR = "ออก";
  test = [];
  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) d4OUT_paginator: MatPaginator;
  @ViewChild(MatSort, {static: true }) sort: MatSort;
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  numCarFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.numCarSource.filter = filterValue.trim().toLowerCase();
  }

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

  constructor(private apiService:ApiService) { }

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
      this._door4In = _car4IN;
      this.door4InSource = new MatTableDataSource(this._door4In);
      this.door4InSource.sort = this.sort;
      this.door4InSource.paginator = this.paginator;
      console.log(this._door4In)
    })
  }
  getDoor4_OUT() {
    this.apiService.getDoor4_OUT().subscribe((_car4OUT: any) => {
      this._door4Out = _car4OUT;
      this.door4OutSource = new MatTableDataSource(this._door4Out);
      this.door4OutSource.sort = this.sort;
      this.door4OutSource.paginator = this.paginator;
      console.log(this._door4Out)
    })
  }
  getDoor5_IN() {
    this.apiService.getDoor5_IN().subscribe((_car5IN : any) => {
      this._door5In = _car5IN;
      this.door5InSource = new MatTableDataSource(this._door5In);
      this.door5InSource.sort = this.sort;
      this.door5InSource.paginator = this.paginator;
      console.log(this._door5In)
    })
  }
  getDoor5_OUT() {
    this.apiService.getDoor5_OUT().subscribe((_car5OUT: any) => {
      this._door5Out = _car5OUT;
      this.door5OutSource = new MatTableDataSource(this._door5Out);
      this.door5OutSource.sort = this.sort;
      this.door5OutSource.paginator = this.paginator;
      console.log(this._door5Out)
    })
  }




  getIcarin() {
    this.apiService.getIcarin().subscribe((_data : any) => {
      this._Icarin = _data['data'];
      this.dataSource = new MatTableDataSource(this._Icarin);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this._Icarin)
    });
  }

  getnumCar() {
    this.apiService.getnumCar().subscribe((_data : any) => {
      this._numCar = _data;
      this.numCarSource = new MatTableDataSource(this._numCar);
      this.numCarSource.sort = this.sort;
      this.numCarSource.paginator = this.paginator;
      console.log(this._numCar)
    });
  }

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

  getApiCarIn(){
    this.apiService.getIcarin()
    .subscribe((_data : any) => {
      this._Icarin = _data['data']
      console.log(this._Icarin)
    });
  }

}

