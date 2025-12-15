import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  // ... tus otras rutas ...
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { 
    path: 'admin', 
    canActivate: [AuthGuard], // Protege toda la zona admin (login requerido)
    children: [
      // Redirección inteligente:
      // Como no podemos usar lógica condicional en 'redirectTo' puro,
      // lo dejaremos apuntando al dashboard, pero el Guard del dashboard
      // se encargará de rebotar al usuario normal hacia clientes.
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      
      { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [AuthGuard] // <--- AÑADIR ESTO: Doble chequeo para validar rol
      }, 
      
      { path: 'clientes', component: ClientesComponent },
      { path: 'productos', component: ProductosComponent },
    ]
  },
  
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }