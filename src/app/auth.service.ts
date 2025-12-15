import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Usamos BehaviorSubject para que los componentes (como el Header) sepan si el estado cambia
  private loggedIn = new BehaviorSubject<boolean>(false);

  // Observable público para suscribirse
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router) {
    // (Opcional) Verificar si ya había sesión guardada en localStorage
    if (localStorage.getItem('token')) {
      this.loggedIn.next(true);
    }
  }

  login(user: string, pass: string): boolean {
    // AQUI SIMULAMOS LA VALIDACIÓN
    if (user === 'admin' && pass === '1234') {
      this.loggedIn.next(true);
      localStorage.setItem('token', 'token-falso-12345'); // Guardar persistencia simple
      this.router.navigate(['/admin/clientes']); // Redirigir al panel
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Método simple para el Guard
  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }
}