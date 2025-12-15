import { Component, OnInit } from '@angular/core';
import { ProductosService } from './productos.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  
  constructor(
    private productosService: ProductosService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getProductos(); 
  }

  // Getter para saber si es admin (usado en el HTML para mostrar/ocultar botones)
  get isAdmin(): boolean {
    return this.authService.getRole() === 'admin';
  }

  getProductos(): void {
    this.loading = true;
    this.productosService.getData('productos').subscribe({
      next: (data: any) => {
        // Protección contra formatos de respuesta variados (array directo u objeto)
        const lista = data.productos || data;
        this.productos = Array.isArray(lista) ? lista : [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el catálogo de productos.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  // --- ACCIONES DE ADMINISTRADOR ---

  agregarProducto() {
    if (!this.isAdmin) return; // Doble seguridad

    // 1. Pedir datos
    const nombre = prompt('Nombre del nuevo producto:');
    if (!nombre) return;

    const precioStr = prompt('Precio del producto (ej: 10.50):');
    const precio = parseFloat(precioStr || '0');
    if (isNaN(precio)) {
      alert('El precio debe ser un número válido.');
      return;
    }
    
    const stockStr = prompt('Cantidad en Stock inicial:');
    const stock = parseInt(stockStr || '0', 10);

    // 2. Crear objeto
    const nuevoProducto = {
      nombre: nombre,
      precio: precio,
      stock: stock,
      categoriaId: 1 // Valor por defecto o podrías pedirlo también
    };

    // 3. Guardar en Backend
    this.loading = true;
    this.productosService.postData('productos', nuevoProducto).subscribe({
      next: () => {
        alert('Producto agregado al catálogo');
        this.getProductos(); // Recargar la tabla
      },
      error: (err) => {
        alert('Error al guardar producto');
        console.error(err);
        this.loading = false;
      }
    });
  }

  editarProducto(producto: any) {
    if (!this.isAdmin) return;

    // Para simplificar, aquí editamos solo el precio y el stock
    // Podrías hacer más prompts si quieres editar el nombre también
    const nuevoPrecioStr = prompt(`Editar Precio para "${producto.nombre}":`, producto.precio);
    
    if (nuevoPrecioStr !== null) { // Solo si no canceló
      const nuevoPrecio = parseFloat(nuevoPrecioStr);
      if (isNaN(nuevoPrecio)) {
        alert('Precio inválido');
        return;
      }

      // Preparar objeto actualizado (mantenemos los datos viejos y pisamos el precio)
      const datosActualizados = { 
        ...producto, 
        precio: nuevoPrecio 
      };

      this.productosService.putData('productos', producto.id, datosActualizados).subscribe({
        next: () => {
          alert('✅ Producto actualizado');
          this.getProductos();
        },
        error: (err) => {
          alert('Error al actualizar');
          console.error(err);
        }
      });
    }
  }

  eliminarProducto(id: number) {
    if (!this.isAdmin) return;

    if (confirm('¿Estás seguro de eliminar este producto del inventario?')) {
      this.productosService.deleteData('productos', id).subscribe({
        next: () => {
          // Eliminamos localmente para feedback instantáneo
          this.productos = this.productos.filter(p => p.id !== id);
          alert('Producto eliminado');
        },
        error: (err) => {
          alert('Error al eliminar');
          console.error(err);
        }
      });
    }
  }
}