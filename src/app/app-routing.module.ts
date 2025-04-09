import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
=======
import { authGuard } from './guards/auth.guard';
>>>>>>> e2d75ef (Subida de Agenda1)

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
<<<<<<< HEAD
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
=======
>>>>>>> e2d75ef (Subida de Agenda1)
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
<<<<<<< HEAD
    path: 'admin-users',
    loadChildren: () => import('./admin-users/admin-users.module').then( m => m.AdminUsersPageModule)
  },
  {
    path: 'camara',
    loadChildren: () => import('./camara/camara.module').then( m => m.CamaraPageModule)
  },
  {
=======
    canActivate: [authGuard],
>>>>>>> e2d75ef (Subida de Agenda1)
    path: 'agenda',
    loadChildren: () => import('./agenda/agenda.module').then( m => m.AgendaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

<<<<<<< HEAD
 // Autor: Sebastian Andoney
=======
 // Autor: Sebastian Andoney
>>>>>>> e2d75ef (Subida de Agenda1)
