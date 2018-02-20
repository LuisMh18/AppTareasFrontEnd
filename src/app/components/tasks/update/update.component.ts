import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/users/user.service'; 
import { LoginService } from '../../../services/login/login.service'; 
import { TaskService } from '../../../services/tasks/task.service'; 
import { Task } from '../../../models/task';


@Component({
  selector: 'app-update',
  templateUrl: '../tasks.component.html',
  styleUrls: ['../tasks.component.css'],
  providers: [UserService, LoginService, TaskService]
})
export class UpdateComponent implements OnInit {
  public page_title: string;
  public token;
  public identity;
  public task: Task;
  public loading;
  public id;

  constructor(
    private _loginService: LoginService,
    private _userService: UserService,
    private _taskService: TaskService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "Atualizar tarea";
    this.token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();
  }

  ngOnInit() {
    if(this.token == null){
      this._router.navigate(['/login']);
    } else {
      this.task = new Task(0, '', '', '','','');
      this.detailTask();
    }
  }

  detailTask(){
    this.loading = 'show';
    //accedemos a los parametros de la url, con el foreach recorremos todos los paramtros
    this._route.params.forEach((params: Params) => {
      this.id = +params['id']; //con el + convertimos el id a un entero
      this._taskService.detailTask(this.token, this.id).subscribe(
        response => {
          console.log(this.identity.id);
          console.log(response.data.data.user_id);
          //comprobamos si la tarea le pertenece al usuario logueado, si no le pertenece
          //no la va poder ver y nos redirigira a otra pagina
          if(response.data.data.user_id == this.identity.id){
            this.task = response.data.data;
            this.loading = 'hide';
            console.log(this.task);
          } else {
            //si no es el propietario lo redirigimos al login, pero si ya estamos loguedos nos redirigira a la home
            this._router.navigate(['/login']);
          }
        }, error => {
          if(error.statusText == 'Unauthorized'){
            this._loginService.token_expired();
          } else {
            console.log(<any>error);
          }
        }
      );
    });
  }

  onSubmit(){
    this._taskService.update(this.token, this.task).subscribe(
      response => {
        console.log(response);

        //redirigimos a las tareas
        //this._router.navigate(['/task', this.task.id]);
        this._router.navigate(['/']);
      }, error => {
        if(error.statusText == 'Unauthorized'){
          this._loginService.token_expired();
        } else {
          console.log(<any>error);
        }
      }
    );
  }

}




