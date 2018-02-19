import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/users/user.service'; 
import { LoginService } from '../../services/login/login.service'; 
import { TaskService } from '../../services/tasks/task.service'; 
import { Task } from '../../models/task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [UserService, LoginService, TaskService]
})
export class TasksComponent implements OnInit {
  public page_title: string;
  public token;
  public task: Task;

  constructor(
    private _loginService: LoginService,
    private _userService: UserService,
    private _taskService: TaskService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "Crear nueva tarea";
    this.token = this._loginService.getToken();
  }

  ngOnInit() {
    if(this.token == null){
      this._router.navigate(['/login']);
    } else {
      this.task = new Task(1, '', '', 'new', 'nul', 'null');
    }
  }

  onSubmit(){
    this._taskService.create(this.token, this.task).subscribe(
      response => {
        console.log(response);

        //redirigimos a las tareas
        //this._router.navigate(['/task', this.task.id]);
        this._router.navigate(['/']);
      }, error => {
        console.log(<any>error);
      }
    );
  }

}
