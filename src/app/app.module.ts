import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ProductosService } from './productos/productos.service';
import { ClientesService } from './clientes/clientes.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// ¡IMPORTACIÓN DE APPCOMPONENT REQUERIDA!
import { AppComponent } from './app.component'; // <--- AGREGAR ESTA LÍNEA

import { ClientesComponent } from './clientes/clientes.component';
import { HeaderComponent } from './header/header.component';
import { ProductosComponent } from './productos/productos.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,       // <--- AGREGAR AQUÍ
    ClientesComponent,
    HeaderComponent,
    ProductosComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductosService, ClientesService],
  
  // ¡EL ARRANQUE DE LA APLICACIÓN ES VITAL!
  bootstrap: [AppComponent] // <--- ¡LA LÍNEA QUE FALTABA!
})
export class AppModule { }