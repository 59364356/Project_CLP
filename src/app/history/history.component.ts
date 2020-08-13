import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { IcarOut } from '../interface/carOut';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { history_car } from '../interface/history_car';
import { HistoryDialogComponent } from '../history-dialog/history-dialog.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  _IcarOut: IcarOut[];
  displayedColumns: string[] = ['id','name', 'username', 'email', 'phone', 'street', 'city'];
  dataSource;
  dataSourceEmpty = []

  _hisCar : history_car[];
  _hisCar2 : history_car[];
  hisCarColumns : string[] = ['img_car', 'img_licenplate', 'number_car', 'gateway', 'door', 'province', 'type_car', 'color', 'datetime', 'user_name'];
  hisCarSource;
  hisCarSourceEmpty = [];

  INCAR = "เข้า";
  OUTCAR = "ออก";
  cuser = [];

  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true }) sort: MatSort;

  hisCarSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.hisCarSource.filter = filterValue.trim().toLowerCase();
  }  

  constructor(private apiService: ApiService, public dialog: MatDialog) { }


  ngOnInit() {
    // this.getIcarout();
    this.getHisCar();
  }

  getHisDialog(){

  }

  getLocalHis(idHisID){
    localStorage.setItem('idHisDialog', idHisID)
  }

  openDialog() {
    this.dialog.open(HistoryDialogComponent);
  }

  
  getIcarout() {
    this.apiService.getIcarOut().subscribe((_data: any) => {
      this._IcarOut = _data;
      this.dataSource = new MatTableDataSource(this._IcarOut);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this._IcarOut);

    }, err =>{
      console.log(err);
    })
  }

  getHisCar() {
    this.apiService.getHisCar().subscribe((_data: any) =>{
      this._hisCar = _data['data'];
      this.hisCarSource = new MatTableDataSource(this._hisCar);
      // this.hisCarSource.sort = this.sort;
      this.hisCarSource.paginator = this.paginator;
      console.log(this._hisCar);

    }, err =>{
      console.log(err);
    })
    
  }

  // getIcarin() {
  //   this.apiService.getIcarin().subscribe((_data : any) => {
  //   this._Icarin = _data['data'];
  //   this.dataSource = new MatTableDataSource(this._Icarin);
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   console.log(this._Icarin)
  //   });
  // }

  selectOptions: string[] = ['ประตู 4', 'ประตู 5', 'ประตู 6'];
  selectedValue = 'ประตู 5';

  typecars: string[] =[
    'รถเก๋ง', 'รถกระบะ', 'รถตู้', 'SUV'
  ]

  colors: string[] = [
    'สีขาว','สีดำ','สีเทา','สีแดง','สีเขียว','สีฟ้า'
  ]

  provinces: string[] = [
    'กรุงเทพมหานคร',
    'กระบี่',
    'กาญจนบุรี',
    'กาฬสินธุ์',
    'กำแพงเพชร',
    'ขอนแก่น',
    'จันทบุรี',
    'ฉะเชิงเทรา',
    'ชลบุรี',
    'ชัยนาท',
    'ชัยภูมิ',
    'ชุมพร',
    'เชียงราย',
    'เชียงใหม่',
    'ตรัง',
    'ตราด',
    'ตาก',
    'นครนายก',
    'นครปฐม',
    'นครพนม',
    'นครราชสีมา',
    'นครศรีธรรมราช',
    'นครสวรรค์',
    'นนทบุรี',
    'นราธิวาส',
    'น่าน',
    'หนองคาย',
    'หนองบัวลำภู',
    'บุรีรัมย์',
    'บึงกาฬ',
    'ปทุมธานี',
    'ประจวบคีรีขันธ์',
    'ปราจีนบุรี',
    'ปัตตานี',
    'พระนครศรีอยุธยา',
    'พังงา',
    'พัทลุง',
    'พิจิตร',
    'พิษณุโลก',
    'เพชรบุรี',
    'เพชรบูรณ์',
    'แพร่',
    'พะเยา',
    'ภูเก็ต',
    'มหาสารคาม',
    'แม่ฮ่องสอน',
    'มุกดาหาร',
    'ยะลา',
    'ยโสธร',
    'ร้อยเอ็ด',
    'ระนอง',
    'ระยอง',
    'ราชบุรี',
    'ลพบุรี',
    'ลำปาง',
    'ลำพูน',
    'เลย',
    'ศรีสะเกษ',
    'สกลนคร',
    'สงขลา',
    'สตูล',
    'สมุทรปราการ',
    'สมุทรสงคราม',
    'สมุทรสาคร',
    'สระแก้ว',
    'สระบุรี',
    'สิงห์บุรี',
    'สุโขทัย',
    'สุพรรณบุรี',
    'สุราษฎร์ธานี',
    'สุรินทร์',
    'อ่างทอง',
    'อุดรธานี',
    'อุทัยธานี',
    'อุตรดิตถ์',
    'อุบลราชธานี',
    'อำนาจเจริญ', 
  ];

}
