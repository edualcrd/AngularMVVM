import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularMVVM';
  usuarios: any[] = [];
  productos: any;
  carritos: any;
  clientes: any;
  error: string | null = null;
  data: any;  // Variable para almacenar los datos
  loading: boolean = true;  // Indicador de carga



}
