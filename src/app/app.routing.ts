import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes = [
    {path:'', component: LoginComponent},//cuando el path este vacio que nos cargue el login
    {path:'login', component: LoginComponent},//cuando el path sea login que nos cargue el login
    {path:'register', component: RegisterComponent},//ruta para el registro
    {path: '**', component: LoginComponent}//cuando la ruta no exista nos muestra el login
];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes); //cargamos las rutas