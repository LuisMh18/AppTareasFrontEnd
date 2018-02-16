import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

//los (..) es para salir de una carpeta, saimos de la carpeta login, luego de la carpeta components y entramos en la carpeta services donde tenemos nuestros servicios
import { LoginService } from '../../services/login/login.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public title: string;
  public user;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService
  ) {
    this.title = 'Identificate';
   
    
   }

  ngOnInit() {
    this.user = {
      "email":"",
      "password":""
    }

    console.log('El componente de login ha sido cargado!!');
   // console.log(localStorage.getItem('token'));
   // let ide = this._loginService.getIdentity();
  //console.log(this._loginService.getToken());
   // console.log('id: ' + ide);
   // console.log('token: ' + tk);
   this.redirectIdentity();
  }

  redirectIdentity(){
    let token = this._loginService.getToken();
    if(token != null){
      this._router.navigate(['/']);
    }

  }


  onSubmit(){
    //console.log(this.user);
    this._loginService.signup(this.user).subscribe(
      response => {
        //console.log(response);
          let token = response;
          this.token = token;
          localStorage.setItem('token', this.token);
          //this._router.navigate(['/']); //redirigimos a la home
          window.location.href = '/';
      }, error => {
        console.log(<any>error);
      }
    );
  }


}
