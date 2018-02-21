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
    let ruta_page = (page == null || page == '') ? 'tasks?token='+token : 'tasks?token='+token+'&page='+page;
    return this._http.post(this.url+ruta_page, params, options)
                       .map(res => res.json());

   }

   detailTask(token, id){
    return this._http.get(this.url+'tasks/'+id+'?token='+token)
                       .map(res => res.json());
   }

   //Actualizar tarea
  update(token, task): Observable<any> {
    let params = JSON.stringify(task);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

      return this._http.put(this.url+'tasks/'+task.id+'?token='+token, params, options)
                       .map(res => res.json());

  }


  deletelTask(token, id){
    return this._http.delete(this.url+'tasks/'+id+'?token='+token)
                       .map(res => res.json());
   }

}
