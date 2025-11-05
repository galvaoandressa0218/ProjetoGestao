import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
// import { ActivatedRoute } from '@angular/router'; // Não é mais necessário
// import { Observable } from 'rxjs'; // Não é mais necessário
import { PostagemResponse } from '../../model/psotagem.model';
// import { PostagemService } from '../../services/postagem.service'; // Não é mais necessário

@Component({
  selector: 'app-review-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailPageComponent {
  
  // Não é mais um Observable, é apenas o objeto
  postagem: PostagemResponse | undefined;

  constructor(
    private router: Router
    // private route: ActivatedRoute, // Removido
    // private postagemService: PostagemService // Removido
  ) {
    // ✅ LÓGICA MOVIDA PARA O CONSTRUTOR
    // Pega a navegação atual
    const navigation = this.router.getCurrentNavigation();
    
    // Tenta pegar os dados do 'state'
    this.postagem = navigation?.extras?.state?.['postagemData'];

    // Se não houver dados (ex: refresh na página),
    // redireciona de volta para a home
    if (!this.postagem) {
      this.router.navigate(['/home']);
    }
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }
}