import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-clientes', 
  templateUrl: './clientes.component.html', 
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes: any[] = []; 
  error: string | null = null;
  loading: boolean = true;
  
  constructor(
    private clientesService: ClientesService,
    private authService: AuthService 
  ) { }

  ngOnInit() {
    this.getClientes();
  }

  // Getter para saber si es admin (usado en el HTML)
  get isAdmin(): boolean {
    return this.authService.getRole() === 'admin';
  }

  getClientes(): void {
    this.loading = true;
    this.clientesService.getData('clientes').subscribe({
      next: (data: any) => {
        // Verificación de seguridad por si json-server devuelve un objeto { clientes: [...] }
        const lista = data.clientes || data; 
        this.clientes = Array.isArray(lista) ? lista : [];
        this.loading = false;
      },
      error: (err) => { 
        this.error = 'No se pudieron cargar los datos.';
        console.error(err);
        this.loading = false; 
      }
    });
  }

  // --- LÓGICA IMPLEMENTADA ---

  agregarCliente() {
    // 1. Pedimos datos básicos con ventanas emergentes
    const nombre = prompt('Ingresa el Nombre del cliente:');
    if (!nombre) return; // Si cancela o deja vacío, no hacemos nada

    const email = prompt('Ingresa el Email:');
    const telefono = prompt('Ingresa el Teléfono (opcional):');

    // 2. Preparamos el objeto
    const nuevoCliente = {
      nombre: nombre,
      email: email || 'Sin email',
      telefono: telefono || 'Sin teléfono',
      direccion: 'Dirección pendiente' // Valor por defecto
    };

    // 3. Enviamos al backend
    this.loading = true;
    this.clientesService.postData('clientes', nuevoCliente).subscribe({
      next: (resp) => {
        alert('Cliente creado correctamente');
        this.getClientes(); // Recargamos la lista para ver el nuevo
      },
      error: (err) => {
        alert('Error al crear cliente');
        console.error(err);
        this.loading = false;
      }
    });
  }

  eliminarCliente(id: number) {
    // 1. Confirmación de seguridad
    if(confirm('¿Seguro que deseas eliminar este cliente? Esta acción no se puede deshacer.')) {
      
      // 2. Llamada al backend
      this.clientesService.deleteData('clientes', id).subscribe({
        next: () => {
          // Opción rápida: Eliminarlo del array localmente para no tener que recargar todo
          this.clientes = this.clientes.filter(c => c.id !== id);
          alert('Cliente eliminado');
        },
        error: (err) => {
          alert('Error al eliminar cliente');
          console.error(err);
        }
      });
    } 
  }
}