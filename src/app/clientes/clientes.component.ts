import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-clientes', 
  templateUrl: './clientes.component.html', 
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  // Única fuente de datos. Se inicializa como array vacío.
  clientes: any[] = []; 
  error: string | null = null;
  loading: boolean = true;
  
  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
    // La carga de datos comienza cuando el componente se inicializa
    this.getClientes();
  }

  getClientes(): void {
    // La ruta 'usuarios' es la que usaste previamente, la mantenemos
    this.clientesService.getData('clientes').subscribe({
      next: (data: any) => {
        // --- INICIO DEPURACIÓN Y ASIGNACIÓN CRÍTICA ---
        
        // Muestra la respuesta completa en la consola para saber la clave correcta
        console.log("Respuesta Completa del Servicio (Clientes):", data);

        let clientesArray = data;

        // **PASO CLAVE:** Si la respuesta no es un array directo, debes acceder a la propiedad.
        // Las claves más comunes son 'clientes', 'usuarios', o 'data'.
        if (data && !Array.isArray(data)) {
            clientesArray = data.clientes || data.usuarios || data.data;
        }

        // Aseguramos que la asignación sea siempre un array (o un array vacío)
        this.clientes = Array.isArray(clientesArray) ? clientesArray : [];
        
        // --- FIN DEPURACIÓN Y ASIGNACIÓN CRÍTICA ---

        console.log("Se cargaron", this.clientes.length, "clientes.");
        
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar clientes. Verifique la conexión al backend.';
        console.error("Error al cargar clientes:", err);
        this.loading = false;
      }
    });
  }
}