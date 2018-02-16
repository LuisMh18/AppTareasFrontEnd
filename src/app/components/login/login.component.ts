import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

//los (..) es para salir de una carpeta, saimos de la carpeta login, luego de la carpeta components y entramos en la carpeta services donde tenemos nuestros servicios
import { UserService } from '../../services/users/user.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public title: string;
  public user;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Identificate';
    this.user = {
      "email":"",
      "password":""
    }
   }

  ngOnInit() {
    console.log('El componente de login ha sido cargado!!')
  }

  onSubmit(){
    console.log(this.user);
    console.log(this._userService.signup());
  }
}
