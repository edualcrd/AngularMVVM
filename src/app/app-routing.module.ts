import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // RUTA PÚBLICA (Login)
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // RUTAS PRIVADAS (Protegidas por AuthGuard)
  // Agrupamos bajo 'admin' para que parezca un panel real
  { 
    path: 'admin', 
    canActivate: [AuthGuard], // <--- Aquí actúa el Guard
    children: [
      { path: 'clientes', component: ClientesComponent },
      { path: 'productos', component: ProductosComponent },
    ]
  },
  
  // Cualquier ruta desconocida va al login
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }