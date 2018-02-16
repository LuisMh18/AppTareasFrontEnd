import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login/login.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent {
  title = 'app';

  constructor(
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    console.log("token: "+this._loginService.getToken());
    console.log('Hola');
  }
}
