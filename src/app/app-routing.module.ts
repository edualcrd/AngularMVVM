import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 1. IMPORTAR COMPONENTES
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';


// 2. DEFINIR LAS RUTAS
const routes: Routes = [
  // Redirigir la ruta raíz (/) a /productos por defecto
  { path: '', redirectTo: '/productos', pathMatch: 'full' },

  // Ruta para Productos: cuando la URL sea /productos, cargar ProductosComponent
  { path: 'productos', component: ProductosComponent },

  // Ruta para Clientes: cuando la URL sea /clientes, cargar ClientesComponent
  { path: 'clientes', component: ClientesComponent },
  
  // Ruta comodín (opcional): Maneja cualquier otra URL no definida (ej. 404)
  // { path: '**', component: TuComponente404 }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }