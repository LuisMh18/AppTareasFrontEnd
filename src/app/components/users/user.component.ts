import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users/user.service'; 
import { LoginService } from '../../services/login/login.service'; 
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  public title: string;
  public user: User;
  public status;
  public identity;
  public token;
  constructor(
    private _userService: UserService,
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = "Modificar mis datos";
    this.identity = this._loginService.getIdentity();
    this.token = this._loginService.getToken();
   }

  ngOnInit() {
    if(this.token == null){
      this._router.navigate(['/login']);
    } else {
      this.user = new User(0, 0, '', '', '', '', '');
      this.getUser();
    }
    
  } 

  getUser(){
    console.log(this.identity.id);

    this._userService.getUser(this.identity.id, this.token).subscribe(
      response => {
        //console.log(response);
        this.user = new User(
          response.data.data.id,
          0,
          response.data.data.name,
          response.data.data.surname,
          response.data.data.email,
          '',
          ''
        );
      }, error => {
        console.log(<any>error);
      }
    );

   
  }

  onSubmit(){
    console.log(this.user);
    this._userService.update_user(this.user, this.token).subscribe(
      response => {
       console.log(response);
        //actualizamos el objeto del localStorage
        localStorage.setItem('identity', JSON.stringify(response.data.data));
      }, error => {
        console.log(<any>error);
      }
    );
  }

}
