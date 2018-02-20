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
  public pages;
  public pageNext;
  public pageCurrent;
  public pagePrev;
  public pNext;
  public page;
  public loading;
  public styles;
  public stylePaginacion: string;
  public currentPage;//pagina actual

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
      let page = null;
      this.data = {
        order:0,
        campo:0,
        search:0
      };

      if(this.token != null){
        this.showpagination(this.token, page, this.data);
      }
    
   }


   nPage(page){
    this.data = {
      order:0,
      campo:0,
      search:0
    };
    if(page != 'null'){
      this.showpagination(this.token, page, this.data);
    }
     
   }

   showpagination(token, page, data){
    this.loading = 'show';
    this._taskService.getTask(token, page, data).subscribe(
      response => {
        console.log(response);
        this.tasks = response.data.data;

        if(response.data.current_page == 1){
              this.pageCurrent = 'null';
              this.pagePrev = 'null';
        } else {
               this.pageCurrent = 1;
               this.pagePrev = response.data.current_page - 1;
        }

        this.stylePaginacion = "boton-paginacion";

        this.currentPage = response.data.current_page;

        //--------------------------------------------------------------------------------------------------------------------------------------
        /*Si el total de los datos es menor o igual a 5 y la variable next_page_url es igual anull ejecutamos esta parte Nota: no se porq aveces la next_page_url viene en null
            por eso no la tome en cuenta a la hora de ir a la pagina siguiente y lo q hice fue a la pagina actual sumarle uno para q e esta manera siempre nos mande a la siguiente pagina*/
					if(response.data.last_page <= 5){
            //total de paginas
            this.pages = [];
						for (let i = 1; i <= response.data.last_page; i++) {
              this.page = i;
              this.pages.push(i);
						}

					} else {
						let paginacion = 5; //siepre que se liste por primera ves la paginación tendra un valor por defecto de 5
						let indice = 1; //y el indice un valor de 1
						if(response.data.current_page > 3){ //comprobamos su la pagina actual es mayor a 3 para que si es mayor de esta manera vaya cambianod dinamicamente los resultados de la pagina
							if(response.data.last_page - response.data.current_page >= 2){//si el resultado de la resta da un mayor a 2 o igual siempre habra dos paginas tanto a la izquierda como a la derecha de la pagina actual
								paginacion = response.data.current_page + 2;
                indice = response.data.current_page - 2;
                console.log('dos de cada lado');
							} else if(response.data.last_page - data.current_page == 1){ //en caso de que la diferencia sea igual a 1 quiere decir que estamos en la penultima pagina
								paginacion = response.data.current_page + 1;
                indice = response.data.current_page - 3;
                console.log('penultima pagina');
              } else { //y en caso de que el resultado sea 0 quiere decir que estamos en la ultima pagina 
                console.log('ultima pagina');
								paginacion = response.data.current_page;
								indice = response.data.current_page - 4;
							}
							
            }
            
						//total de paginas
            this.pages = [];
						for (let i = indice; i <= paginacion; i++) {
            
              this.pages.push(i);

						}
					}


        //------------------------------------------------------------------------------------------------------------------------------------------


        if(response.data.current_page == response.data.last_page){
          this.pNext = 'null';
          this.pageNext = 'null';
        } else {
            this.pNext = response.data.current_page + 1;
            this.pageNext = response.data.last_page;
        }

      
        //this.pageCurrent = (response.data.current_page == 1) ? null : 1;
        //this.pagePrev = (response.data.current_page == 1) ? null : response.data.prev_page_url;

        this.loading = 'hide';


      }, error => {
        console.log(<any>error);
      }
    );

   }

}

