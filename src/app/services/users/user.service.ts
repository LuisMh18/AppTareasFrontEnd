import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';

@Injectable()
export class UserService {
  public url: string;
  public token;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
   }

  //registro de usuarios
  register(user): Observable<Response>{
    console.log(user);
    let params = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

      return this._http.post(this.url+'register', params, options)
                       .map(res => res.json());


  }

}








