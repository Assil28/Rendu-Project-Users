import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/authGard/auth.guard';

const routes: Routes = [
  { path : 'home', component: HomeComponent },
  { path : 'login', component: LoginComponent },

  { path : '', redirectTo : 'login', pathMatch:'full'},
  {
    path: 'books',
    loadChildren: () => import('./books/books.module')
      .then(m => m.BooksModule),
      canActivate:[AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module')
      .then(m => m.UsersModule),
      canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
