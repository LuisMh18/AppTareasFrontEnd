import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login/login.service'; 
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent {
  title = 'app';
  public identity;
  public token;
  public cession_cerrada;

  constructor(
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.identity = this._loginService.getIdentity();
    this.token = this._loginService.getToken();
    console.log('llamamos al token');
   }

  ngOnInit() {
    console.log('componente principal cargado');
  }


  logout(){
    this.token = this._loginService.getToken();
    this._loginService.logout(this.token);

    this._loginService.logout(this.token).subscribe(
      response => {
        let cession_cerrada = response.data.message;
        this.cession_cerrada = cession_cerrada;
        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        this.token = null;
        //this._router.navigate(['/']);
        window.location.href = '/login'; //redirigimos al  login
      }, error => {
        console.log(<any>error);
      }
    );

   
  }

}
