import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';


@Injectable()
export class LoginService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
   }


   signup(user_login): Observable<Response> {
    let params = JSON.stringify(user_login);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

      return this._http.post(this.url+'login', params, options)
                       .map(res => res.json());

  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    console.log('hola');

		if(identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
  }
  

  getToken(){
    let token = localStorage.getItem('token');
   // console.log("token:"+ this.token);

		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}

}
