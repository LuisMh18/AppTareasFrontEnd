import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { LoginService } from '../../services/login/login.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public title: string;
  public token;
  public identity;

  constructor(
     private _route: ActivatedRoute,
     private _router: Router,
     private _loginService: LoginService
   ) {
     this.title = 'Componente de la Home';
    }
 
   ngOnInit() {
     console.log('El componente de la Home ha sido cargado!!');
     //console.log("token: "+this._loginService.getToken());
     //si el token es diferente a null, es decir si el usuario ah sido logueado entonces obtenemos sus datos 
     if(this._loginService.getToken() != null){
        this._loginService.getUser(this._loginService.getToken()).subscribe(
          response => {
            let identity = response.data;
            // como en un objeto lo convertimos en una cadena de texto con JSON.stringify
            localStorage.setItem('identity', JSON.stringify(identity));
          }, error => {
            console.log(<any>error);
          }
        );
    }
   }

}

