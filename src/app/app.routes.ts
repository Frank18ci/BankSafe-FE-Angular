import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
    {path: "", component: InicioComponent},
    {
        path: "login", component: LoginComponent
    }
];
