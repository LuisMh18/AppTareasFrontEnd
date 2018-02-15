import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public title: string;

  constructor(
   // private _route: ActivatedRoute,
   // private _router: Router
  ) {
    this.title = 'Componente de registro';
   }

  ngOnInit() {
    console.log('El componente de registro ha sido cargado!!')
  }

}
