import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { door4_in } from '../interface/door4_in';
import { door4_out } from '../interface/door4_out';
import { door5_in } from '../interface/door5_in';
import { door5_out } from '../interface/door5_out';
import { history_car } from '../interface/history_car';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-dialog',
  templateUrl: './main-dialog.component.html',
  styleUrls: ['./main-dialog.component.scss']
})
export class MainDialogComponent implements OnInit {

  constructor(private apiService:ApiService, public dialog: MatDialog, private _httpClient: HttpClient) { }

  getidImg = localStorage.getItem('idImgMain')
  getidHis = localStorage.getItem('idHis')
  _door4In : door4_in[];
  _door4Out : door4_out[];
  _door5In : door5_in[];
  _door5Out : door5_out[];
  _hisCar : history_car[];

  showSpinner = true;
  buttonClose = false;

  ngOnInit(): void {
    this.getDoor4_IN()
    this.getDoor4_OUT()
    this.getDoor5_IN()
    this.getDoor5_OUT()
    this.getHisCar()
    this.showSpinner = true;
  }

  getDoor4_IN() {
    this.apiService.getDoor4_IN().subscribe((_car4IN : any) => {
      this._door4In = _car4IN['data'];
      if(this._door4In){
        this.showSpinner = false;
        this.buttonClose = true;
      }
      console.log(this._door4In)
    })
  }
  getDoor4_OUT() {
    this.apiService.getDoor4_OUT().subscribe((_car4OUT: any) => {
      this._door4Out = _car4OUT['data'];
      if(this._door4Out){
        this.showSpinner = false;
        this.buttonClose = true;
      }
      console.log(this._door4Out)
    })
  }
  getDoor5_IN() {
    this.apiService.getDoor5_IN().subscribe((_car5IN : any) => {
      this._door5In = _car5IN['data'];
      if(this._door5In){
        this.showSpinner = false;
        this.buttonClose = true;
      }
      console.log(this._door5In)
    })
  }
  getDoor5_OUT() {
    this.apiService.getDoor5_OUT().subscribe((_car5OUT: any) => {
      this._door5Out = _car5OUT['data'];
      if(this._door5Out){
        this.showSpinner = false;
        this.buttonClose = true;
      }
      console.log(this._door5Out)
    })
  }
  getHisCar() {
    this.apiService.getHisCar().subscribe((_data: any) =>{
      this._hisCar = _data['data'];
      console.log(this._hisCar);
      if(this._hisCar){
        this.showSpinner = false;
      }
    }, err =>{
      console.log(err);
    })
  }


  
  showImgMain(){
    var idImg = localStorage.getItem('idImgMain')

    this.apiService.getDoor4_IN().subscribe((_car4IN : any) => {
      this._door4In = _car4IN['data'];
      console.log(this._door4In)
    });

    this.apiService.getDoor4_OUT().subscribe((_car4OUT: any) => {
      this._door4Out = _car4OUT['data'];
      console.log(this._door4Out)
    })

    this.apiService.getDoor5_IN().subscribe((_car5IN : any) => {
      this._door5In = _car5IN['data'];
      console.log(this._door5In)
    })

    this.apiService.getDoor5_OUT().subscribe((_car5OUT: any) => {
      this._door5Out = _car5OUT['data'];
      console.log(this._door5Out)
    })

  }

}
