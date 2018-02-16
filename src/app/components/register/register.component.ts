import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {

  public title: string;
  public user: User;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Registro de usuarios';
    this.user = new User(1, 0, "", "", "", "", "");
   }

  ngOnInit() {
    console.log('El componente de registro ha sido cargado!!')
  }

  onSubmit(){
    console.log(this.user);
    this._userService.register(this.user).subscribe(
      response => {
        console.log(response);

        //limpiamos el formulario
        this.user = new User(1, 0, "", "", "", "", "");
      }, error => {
        console.log(<any>error);
      }
    );
  }

}
