import { CategoriesComponent } from './components/categories/categories.component';

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import { PostComponent } from './components/post/post.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [


{
  path:'admin',
  loadChildren:() => import('./admin/admin.module').then(m  => m.AdminModule)
},
{
  path:'',
  component: LoginComponent
},
{
  path:'register',
  component: RegisterComponent
},
{
  path:'users',
  component: UsersComponent
},
{
  path:'post',
  component: PostComponent
},
{
  path:'categories',
  component: CategoriesComponent
},
{
  path:'edit-user/:id',
  component: EditUserComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
