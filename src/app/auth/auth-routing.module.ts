import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginComponent } from '../pages/auth/login/login.component';
import { RegisterComponent } from '../pages/auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
          {
            path: "login",
            component: LoginComponent,
          },
          {
            path: "register",
            component: RegisterComponent,
          },
          {
            path: '**',
            redirectTo: 'login'
          }
        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
