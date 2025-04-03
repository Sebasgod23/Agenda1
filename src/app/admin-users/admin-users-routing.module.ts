import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUsersPage } from './admin-users.page';

// Definición de rutas para la página de administración de usuarios
const routes: Routes = [
  {
    path: '', // Ruta base que carga el componente AdminUsersPage
    component: AdminUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa el módulo de rutas para la funcionalidad de carga perezosa (lazy loading)
  exports: [RouterModule], // Exporta RouterModule para que las rutas sean accesibles en otros módulos
})
export class AdminUsersPageRoutingModule {} // Módulo de enrutamiento específico para AdminUsersPage

// Autor: Sebastian Andoney
