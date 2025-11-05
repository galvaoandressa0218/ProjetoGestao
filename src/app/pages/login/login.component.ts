import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Caminho atualizado

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formData = {
    email: "",
    senha: ""
  };
  
  errorMessage: string | null = null;
email: any;
password: any;

  constructor(private router: Router, private authService: AuthService) { }

  handleSignIn() {
    this.errorMessage = null;
    this.authService.login(this.formData).subscribe({
      next: (response) => {
        // Redirecionamento feito no service
      },
      error: (err) => {
        console.error('Erro no login:', err);
        this.errorMessage = 'E-mail ou senha inválidos. Tente novamente.';
      }
    });
  }

  navigateTo(screen: string) {
    this.router.navigate([`/${screen}`]);
  }
}