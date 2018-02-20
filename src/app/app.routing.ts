import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/users/user.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { DetalleComponent } from './components/tasks/detalle/detalle.component';

const appRoutes: Routes = [
    {path:'', component: HomeComponent},//cuando el path este vacio que nos cargue la home
    {path:'login', component: LoginComponent},//cuando el path sea login que nos cargue el login
    {path:'register', component: RegisterComponent},//ruta para el registro
    {path: 'user-edit', component: UserComponent}, 
    {path: 'new-task', component: TasksComponent}, 
    {path: 'task/:id', component: DetalleComponent}, 
    {path: '**', component: LoginComponent}//cuando la ruta no exista nos muestra el login
];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes); //cargamos las rutas