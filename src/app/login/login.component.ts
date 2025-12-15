import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  user: string = '';
  pass: string = '';
  error: boolean = false;

  constructor(private authService: AuthService) {}

  ingresar() {
    const success = this.authService.login(this.user, this.pass);
    if (!success) {
      this.error = true;
    }
  }
}