import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router'; 
import { UserService } from '../../services/users/user.service'; 
import { LoginService } from '../../services/login/login.service'; 
import { TaskService } from '../../services/tasks/task.service'; 
import { Task } from '../../models/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LoginService, TaskService]
})
export class HomeComponent implements OnInit {
  public title: string;
  public token;
  public identity;
  public tasks: Array<Task>;
  public data;

  constructor(
     private _route: ActivatedRoute,
     private _router: Router,
     private _loginService: LoginService,
     private _taskService: TaskService
   ) {
     this.title = 'Componente de la Home';
     this.token = this._loginService.getToken();
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
    this.getAllTasks();
   }

   getAllTasks(){
    this._route.params.forEach((params: Params) =>{
      let page = null;
      this.data = {
        order:0,
        campo:0,
        search:0
      };

      console.log(this.data);

      this._taskService.getTask(this.token, page, this.data).subscribe(
        response => {
          //console.log(response);
          this.tasks = response.data.data;
          console.log(this.tasks);
  
        }, error => {
          console.log(<any>error);
        }
      );
    });
   }

}

