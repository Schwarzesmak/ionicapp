import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },  {
    path: 'profesor-index',
    loadChildren: () => import('./pages/profesor-index/profesor-index.module').then( m => m.ProfesorIndexPageModule)
  },
  {
    path: 'generar-asignaturas',
    loadChildren: () => import('./pages/generar-asignaturas/generar-asignaturas.module').then( m => m.GenerarAsignaturasPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
