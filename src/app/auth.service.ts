import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  
  // Agregamos una propiedad para guardar el rol
  private userRole: string = ''; 

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router) {
    // Si recargamos la página, recuperamos el rol del localStorage
    // (Esto evita que se pierda el rol al refrescar)
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    
    if (token && storedRole) {
      this.loggedIn.next(true);
      this.userRole = storedRole;
    }
  }

  login(user: string, pass: string): boolean {
    // CASO 1: ADMINISTRADOR
    if (user === 'admin' && pass === '1234') {
      this.establecerSesion('admin');
      this.router.navigate(['/admin/dashboard']); // El admin va al Panel
      return true;
    }
    
    // CASO 2: USUARIO NORMAL (Vendedor, Empleado, etc.)
    if (user === 'user' && pass === '1234') {
      this.establecerSesion('user');
      this.router.navigate(['/admin/clientes']); // El usuario va directo a Clientes
      return true;
    }

    return false;
  }

  logout(): void {
    this.loggedIn.next(false);
    this.userRole = '';
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

  // Método auxiliar para saber el rol actual
  getRole(): string {
    return this.userRole;
  }

  // Lógica privada para guardar datos
  private establecerSesion(role: string) {
    this.loggedIn.next(true);
    this.userRole = role;
    localStorage.setItem('token', 'token-simulado');
    localStorage.setItem('role', role);
  }
}