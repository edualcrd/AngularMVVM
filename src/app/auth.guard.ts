import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // 1. Verificar si está logueado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // 2. Verificar permisos específicos para el Dashboard
    // Si la ruta que intenta visitar contiene 'dashboard'...
    if (route.routeConfig?.path === 'dashboard') {
      // ...y NO es admin, lo bloqueamos y mandamos a clientes
      if (this.authService.getRole() !== 'admin') {
        this.router.navigate(['/admin/clientes']);
        return false;
      }
    }

    return true; // Si pasa las comprobaciones, adelante
  }
}