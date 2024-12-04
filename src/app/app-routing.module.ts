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
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainPageModule)
  },
  {
    path: 'profesor-index',
    loadChildren: () => import('./pages/profesor-index/profesor-index.module').then(m => m.ProfesorIndexPageModule)
  },
  {
    path: 'generar-asignaturas',
    loadChildren: () => import('./pages/generar-asignaturas/generar-asignaturas.module').then(m => m.GenerarAsignaturasPageModule)
  },
  {
    path: 'ver-asistencia',
    loadChildren: () => import('./pages/ver-asistencia/ver-asistencia.module').then(m => m.VerAsistenciaPageModule)
  },
  {
    path: 'asistencia-qr',
    loadChildren: () => import('./pages/asistencia-qr/asistencia-qr.module').then(m => m.AsistenciaQRPageModule)
  },
  {
    path: 'pages/auth/sign-up',
    loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },

  {
    path: 'ver-asignaturas',
    loadChildren: () => import('./pages/ver-asignaturas/ver-asignaturas.module').then(m => m.VerAsignaturasPageModule)
  }
  

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
