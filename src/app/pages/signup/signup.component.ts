import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Caminho atualizado

@Component({
  selector: 'app-signup-screen',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {

  formData = {
    nome: "",
    email: "",
    senha: ""
  };

  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  handleCreateAccount() {
    this.errorMessage = null;
    this.authService.register(this.formData).subscribe({
      next: () => {
         // Redirecionamento feito no service
      },
      error: (err) => {
        console.error('Erro no cadastro:', err);
        this.errorMessage = 'Erro ao criar conta. Verifique os dados.';
      }
    });
  }

  navigateTo(screen: string) {
    this.router.navigate([`/${screen}`]);
  }
}