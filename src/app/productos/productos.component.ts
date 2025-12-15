import { Component, OnInit } from '@angular/core'; // AGREGAMOS OnInit
import { ProductosService } from './productos.service';

@Component({
  selector: 'app-productos', // <--- ¡CORREGIDO! No debe ser 'app-root'
  templateUrl: './productos.component.html', // <--- ¡CORREGIDO! Apunta a su propia plantilla
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit { // Implementamos OnInit
  // title = 'AngularMVVM'; // Esta propiedad es opcional aquí, típicamente va solo en AppComponent
  usuarios: any[] = [];
  productos: any;
  error: string | null = null;
  data: any;    // Variable para almacenar los datos
  loading: boolean = true;  // Indicador de carga
  
  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    console.log("dsfsdfsd");
    this.getProductos(); 
  }

  getProductos(): void {
    this.productosService.getData('usuarios').subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar productos';
        console.error(err);
        this.loading = false; // Detener carga en error
      }
    });
  }
}