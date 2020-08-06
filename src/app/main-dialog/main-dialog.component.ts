import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { door4_in } from '../interface/door4_in';
import { door4_out } from '../interface/door4_out';
import { door5_in } from '../interface/door5_in';
import { door5_out } from '../interface/door5_out';

@Component({
  selector: 'app-main-dialog',
  templateUrl: './main-dialog.component.html',
  styleUrls: ['./main-dialog.component.scss']
})
export class MainDialogComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  _door4In : door4_in[];
  _door4Out : door4_out[];
  _door5In : door5_in[];
  _door5Out : door5_out[];

  ngOnInit(): void {
  }

  getDoor4_IN() {
    this.apiService.getDoor4_IN().subscribe((_car4IN : any) => {
      this._door4In = _car4IN['data'];
      console.log(this._door4In)
    })
  }
  getDoor4_OUT() {
    this.apiService.getDoor4_OUT().subscribe((_car4OUT: any) => {
      this._door4Out = _car4OUT['data'];
      console.log(this._door4Out)
    })
  }
  getDoor5_IN() {
    this.apiService.getDoor5_IN().subscribe((_car5IN : any) => {
      this._door5In = _car5IN['data'];
      console.log(this._door5In)
    })
  }
  getDoor5_OUT() {
    this.apiService.getDoor5_OUT().subscribe((_car5OUT: any) => {
      this._door5Out = _car5OUT['data'];
      console.log(this._door5Out)
    })
  }


}
