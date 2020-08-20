import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry  } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';
import { Observer } from 'rxjs';

import { Icarin } from '../interface/car-in';
import { IcarOut } from '../interface/carOut';
import { numberCar } from '../interface/numCar';
import { history_car } from '../interface/history_car';
import { door4_in } from '../interface/door4_in';
import { door4_out } from '../interface/door4_out';
import { door5_in } from '../interface/door5_in';
import { door5_out } from '../interface/door5_out';
import { postLogin, respLogin } from '../interface/postLogin';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  observer: Observer<any>;

  // apiUrl = 'https://reqres.in/api/users?page=2';
  // apiUrl2 = 'https://jsonplaceholder.typicode.com/users';
  // api_NumberCar = 'https://cam-see-car.herokuapp.com/api/history_car/number_car?number_car=ทด201';

  
  // api_Gateway_IN = 'https://cam-see-car.herokuapp.com/api/history_car/gateway?gateway=เข้า';
  // api_Gateway_OUT = 'https://cam-see-car.herokuapp.com/api/history_car/gateway?gateway=ออก';
  // api_Door_4 = 'https://cam-see-car.herokuapp.com/api/history_car/door?door=ประตู4';
  // api_Door_5 = 'https://cam-see-car.herokuapp.com/api/history_car/door?door=ประตู5';

  
  // api_hisCar = io('https://cam-see-car.herokuapp.com/api/history_car/all');
  // apiDoor4_IN = 'https://cam-see-car.herokuapp.com/api/history_car?door=ประตู4&gateway=เข้า';
  // apiDoor4_OUT = 'https://cam-see-car.herokuapp.com/api/history_car?door=ประตู4&gateway=ออก';
  // apiDoor5_IN = 'https://cam-see-car.herokuapp.com/api/history_car?door=ประตู5&gateway=เข้า';
  // apiDoor5_OUT = 'https://cam-see-car.herokuapp.com/api/history_car?door=ประตู5&gateway=ออก';

  api_LCT = 'https://cam-see-car.herokuapp.com/api/';

  apiSTPostLogin= 'https://cam-see-car.herokuapp.com/api/admin/login';

  apiPostLogin: string = 'https://cam-see-car.herokuapp.com/api/admin/login';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  
constructor(private _httpClient: HttpClient) { }


  public getSocketData = () => {
    const socket = socketIo('https://cam-see-car.herokuapp.com');
    socket.on('post', response => {
      return this.observer.next(response);
    });
    return this.createObservable();
  }

  createObservable() {
    return new Observable(observer => this.observer = observer);
  }



// 
  // https://cam-see-car.herokuapp.com/api/history_car/number_car?number_car=%E0%B8%97%E0%B8%94201
  // test = 'https://cam-see-car.herokuapp.com/api/admin/login?username=adminz12345&password=passwordz987654321';


  

  // get history
  getHisCar(): Observable<history_car[]> {
    return this._httpClient.get<history_car[]>(this.api_LCT + 'history_car/all')
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  getHisCarByID(id:string): Observable<history_car[]>{
    return this._httpClient.get<history_car[]>(this.api_LCT + 'history_car/all' + '/' + id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // get door 4 IN
  getDoor4_IN(): Observable<door4_in[]> {
    return this._httpClient.get<door4_in[]>(this.api_LCT + 'history_car?door=ประตู4&gateway=เข้า')
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  getDoor4_IN_ByID(id:string): Observable<door4_in[]>{
    return this._httpClient.get<door4_in[]>(this.api_LCT + 'history_car?door=ประตู4&gateway=เข้า' +'/'+  id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  // get door 4 OUT
  getDoor4_OUT(): Observable<door4_out[]> {
    return this._httpClient.get<door4_out[]>(this.api_LCT + 'history_car?door=ประตู4&gateway=ออก')
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  getDoor4_OUT_ByID(id:string): Observable<door4_out[]>{
    return this._httpClient.get<door4_out[]>(this.api_LCT + 'history_car?door=ประตู4&gateway=ออก' +'/'+  id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // get door 5 IN
  getDoor5_IN(): Observable<door5_in[]> {
    return this._httpClient.get<door5_in[]>(this.api_LCT + 'history_car?door=ประตู5&gateway=เข้า')
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  getDoor5_IN_ByID(id:string): Observable<door5_in[]>{
    return this._httpClient.get<door5_in[]>(this.api_LCT + 'history_car?door=ประตู5&gateway=เข้า' +'/'+  id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // get door 4 OUT
  getDoor5_OUT(): Observable<door5_out[]> {
    return this._httpClient.get<door5_out[]>(this.api_LCT + 'history_car?door=ประตู5&gateway=ออก')
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  getDoor5_OUT_ByID(id:string): Observable<door5_out[]>{
    return this._httpClient.get<door5_out[]>(this.api_LCT + 'history_car?door=ประตู5&gateway=ออก' +'/'+ id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }


  






  checkLogin(username:string, password:string) {
    // return this._httpClient.post<postLogin>(this.apiSTPostLogin, {
    //   'username': username,
    //   'password':password
    // })
    this._httpClient.post('https://cam-see-car.herokuapp.com/api/admin/login', {
        'username': username,
        'password':password
      })
  }

  addPost(postL: postLogin){
    return this._httpClient.post(this.apiPostLogin, postL, this.httpOptions);
  }
  checkPost() {
    return this._httpClient.post(this.apiPostLogin, null, {observe:'response'});
  }
  statusPost(inLogin: respLogin): Observable<any>{
    return this._httpClient.post(this.apiSTPostLogin, inLogin, {observe:'response'})
  }





  // getIcarin() {
  //   return this._httpClient.get<Icarin>(this.apiUrl);
  // }

  // getIcarOut() {
  //   return this._httpClient.get<IcarOut>(this.apiUrl2);
  // }

  // getnumCar() {
  //   return this._httpClient.get<numberCar>(this.api_NumberCar)
  // }



  getTest() {
    return this._httpClient.get<numberCar[]>('https://cam-see-car.herokuapp.com/api/admin/login?username=adminz12345&password=passwordz987654321');
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };







}
