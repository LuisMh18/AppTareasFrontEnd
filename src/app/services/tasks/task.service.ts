import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';


@Injectable()
export class TaskService {
  public url: string;

  constructor(
    private _http: Http,
  ) {
    this.url = GLOBAL.url;
   }

   create(token, task): Observable<any>{
    let params = JSON.stringify(task);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

      return this._http.post(this.url+'tasks/store?token='+token, params, options)
                       .map(res => res.json());
   }

   getTask(token, page = null, dataform){
    let params = JSON.stringify(dataform);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url+'tasks?token='+token, params, options)
                       .map(res => res.json());

   }

}
