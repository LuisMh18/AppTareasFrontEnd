import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router'; 
import { UserService } from '../../../services/users/user.service'; 
import { LoginService } from '../../../services/login/login.service'; 
import { TaskService } from '../../../services/tasks/task.service'; 
import { Task } from '../../../models/task';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  providers: [LoginService, TaskService]
})
export class DetalleComponent implements OnInit {
  public title: string;
  public token;
  public task: Task;
  public identity;
  public loading;

  constructor(
    private _route: ActivatedRoute,
     private _router: Router,
     private _loginService: LoginService,
     private _taskService: TaskService
  ) {
     this.title = 'Detalle de la tarea';
     this.token = this._loginService.getToken();
     this.identity = this._loginService.getIdentity();
   }

  ngOnInit() {
    
    if(this.token != null){
      console.log('Componente detalle de la tarea cargado');
      this.task = new Task(0, '', '', '','','');
      //llamada al servicio de tareas para sacar una tarea
      this.detailTask();
    } else {
      this._router.navigate(['/login']);
    }
  }


  detailTask(){
    this.loading = 'show';
    //accedemos a los parametros de la url, con el foreach recorremos todos los paramtros
    this._route.params.forEach((params: Params) => {
      let id = +params['id']; //con el + convertimos el id a un entero
      this._taskService.detailTask(this.token, id).subscribe(
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


  //eliminar tarea
  deleteTask(id){
    this._taskService.deletelTask(this.token, id).subscribe(
      response => {
        console.log(response);
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
