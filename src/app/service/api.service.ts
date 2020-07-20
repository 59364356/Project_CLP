import { Injectable } from '@angular/core';
import { Icarin } from '../interface/car-in';
import { IcarOut } from '../interface/carOut';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { numberCar } from '../interface/numCar';
import { history_car } from '../interface/history_car';
import { door4_in } from '../interface/door4_in';
import { door4_out } from '../interface/door4_out';
import { door5_in } from '../interface/door5_in';
import { door5_out } from '../interface/door5_out';
import { postLogin, respLogin } from '../interface/postLogin';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://reqres.in/api/users?page=2';
  apiUrl2 = 'https://jsonplaceholder.typicode.com/users';
  api_NumberCar = 'https://cam-see-car.herokuapp.com/api/history_car/number_car?number_car=ทด201';

  
  api_Gateway_IN = 'https://cam-see-car.herokuapp.com/api/history_car/gateway?gateway=เข้า';
  api_Gateway_OUT = 'https://cam-see-car.herokuapp.com/api/history_car/gateway?gateway=ออก';
  api_Door_4 = 'https://cam-see-car.herokuapp.com/api/history_car/door?door=ประตู4';
  api_Door_5 = 'https://cam-see-car.herokuapp.com/api/history_car/door?door=ประตู5';


  api_hisCar = 'https://cam-see-car.herokuapp.com/api/history_car';
  apiDoor4_IN = 'https://cam-see-car.herokuapp.com/api/history_car?door=ประตู4&gateway=เข้า';
  apiDoor4_OUT = 'https://cam-see-car.herokuapp.com/api/history_car?door=ประตู4&gateway=ออก';
  apiDoor5_IN = 'https://cam-see-car.herokuapp.com/api/history_car?door=ประตู5&gateway=เข้า';
  apiDoor5_OUT = 'https://cam-see-car.herokuapp.com/api/history_car?door=ประตู5&gateway=ออก';

  apiPostLogin: string = 'https://cam-see-car.herokuapp.com/api/user/login';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'my-auth-token'
    })
  };
  





// 
  // https://cam-see-car.herokuapp.com/api/history_car/number_car?number_car=%E0%B8%97%E0%B8%94201
  // test = 'https://cam-see-car.herokuapp.com/api/admin/login?username=adminz12345&password=passwordz987654321';


  constructor(private _httpClient: HttpClient) { }

  getHisCar() {
    return this._httpClient.get<history_car>(this.api_hisCar)
  }
  getDoor4_IN() {
    return this._httpClient.get<door4_in>(this.apiDoor4_IN)
  }
  getDoor4_OUT() {
    return this._httpClient.get<door4_out>(this.apiDoor4_OUT)
  }
  getDoor5_IN() {
    return this._httpClient.get<door5_in>(this.apiDoor5_IN)
  }
  getDoor5_OUT() {
    return this._httpClient.get<door5_out>(this.apiDoor5_OUT)
  }

  addPost(postL: postLogin) {
    return this._httpClient.post(this.apiPostLogin, postL, this.httpOptions);
  }





  getIcarin() {
    return this._httpClient.get<Icarin>(this.apiUrl);
  }

  getIcarOut() {
    return this._httpClient.get<IcarOut>(this.apiUrl2);
  }

  getnumCar() {
    return this._httpClient.get<numberCar>(this.api_NumberCar)
  }



  getTest() {
    return this._httpClient.get<numberCar[]>('https://cam-see-car.herokuapp.com/api/admin/login?username=adminz12345&password=passwordz987654321');
  }

}
