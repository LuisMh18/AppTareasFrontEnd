import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

//los (..) es para salir de una carpeta, saimos de la carpeta login, luego de la carpeta components y entramos en la carpeta services donde tenemos nuestros servicios
import { LoginService } from '../../services/login/login.service'; 

//notificaciones
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';



declare var jQuery:any;
declare var $:any;

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
    private notif: NotificationsService,//notificaciones
    private _loginService: LoginService
  ) {
    this.title = 'Identificate';
   
    
   }

  ngOnInit() {
    this.user = {
      "email":"",
      "password":""
    }

    //Tipos de mensajes
    //error	
    //info
    //warn	
   // success

   //comprobamos si la sesion ah sido finalizada oh si el token a expirado, en caso de que no damos la vienvenida
   if(localStorage.sesion == 'finished'){
    this._notif('success', 'Tu sesión ha sido serrada correctamente!');
   } else if(localStorage.sesion == 'token_expired'){
    this._notif('warn', '<div class="font_notif">Tu sesión expiro, ingresa otra vez!</div>');
   } else {
    this._notif('success', '¡Inicia sesión!');
   }
   //limpiamos e localStorage sesion
   setTimeout(function(){ 
      localStorage.setItem('sesion', '');
    }, 2000);
    
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
        console.log(response);
        if(response.error == 'validate'){

          //converitmos el objeto en un array para acceder mas facil  a sus valores
          let data = Object.values(response.errors);

          console.log(Object.values(data));

          for(let err of data){
            console.log(err[0]);
            this._notif('error', `<div class="font_notif">${err[0]}</div>`);
          }

        } else {
          if(response.error == true){
            this._notif('error', response.message);
          } else {
            let token = response;
            this.token = token;
            localStorage.setItem('token', this.token);
            //this._router.navigate(['/']); //redirigimos a la home
            this._notif('success', 'Tu sesión ha sido serrada correctamente!');
            window.location.href = '/';
          }
          
        }
         
      }, error => {
        console.log(<any>error);
      }
    );
  }



  _notif(type, msj){
    if(type == 'success'){

      this.notif.success(
        'Success',
         msj,
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 50,
        }
      );

    } else if(type == 'warn'){

      this.notif.warn(
        'Warning',
        msj,
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 50
        }
      );

    } else if(type == 'info'){

      this.notif.info(
        'Info',
        msj,
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 50
        }
      );

    } else if(type == 'error'){

      this.notif.error(
        'Error',
        msj,
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 50
        }
      );

    } else if(type == 'alert'){

      this.notif.alert(
        'Alert',
        msj,
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 50
        }
      );

    } 

    
  }
  


}
