import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest, switchMap } from 'rxjs';
import { PostagemResponse, NewPostagemData } from '../../model/psotagem.model';
import { PostagemService } from '../../services/postagem.service';
import { AuthService } from '../../services/auth.service';
import { NewReviewModalComponent } from '../../modal/new-review-modal/new-review-modal.component';
import { SearchUserModalComponent } from '../../modal/search-user-modal/search-user-modal.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    NewReviewModalComponent,
    SearchUserModalComponent, // ✅ 2. ADICIONE O NOVO MODAL AOS IMPORTS
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent implements OnInit {
  showNewReview = false;
  showError = false;
  showSearchUserModal = false; // ✅ 3. ADICIONE ESTA LINHA
  
  // Lógica de Postagens (existente)
  postagens$: Observable<PostagemResponse[]>;
  private refreshSignal = new BehaviorSubject<void>(undefined);
  private termoBuscaPost = new BehaviorSubject<string | undefined>(undefined);
  public buscaInputPost: string = ""; 
  
  // ❌ 4. REMOVA TODA A LÓGICA DE BUSCA DE USUÁRIO DAQUI
  // (usuariosEncontrados$, termoBuscaUsuario, buscaInputUsuario)

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private authService: AuthService
    // ❌ 5. REMOVA O 'usuarioService' DO CONSTRUTOR
  ) {
    this.postagens$ = new Observable();
  }

  ngOnInit(): void {
    // Lógica de Postagens (existente)
    this.postagens$ = combineLatest([this.refreshSignal, this.termoBuscaPost]).pipe(
      switchMap(([_, termo]) => {
        return this.postagemService.getPostagens(termo);
      })
    );
    // ❌ 6. REMOVA O 'this.usuariosEncontrados$' DE DENTRO DO ngOnInit
  }

  // --- Métodos de Postagem (existentes) ---
  handleSaveReview(reviewData: Omit<NewPostagemData, 'criadorId'>) {
    this.postagemService.addPostagem(reviewData).subscribe({
      next: () => {
        this.showNewReview = false;
        this.refreshSignal.next(); 
      },
      error: (err) => {
        console.error('Erro ao salvar:', err);
        this.showError = true;
      }
    });
  }

  handleLogout() {
    this.authService.logout();
  }

  viewReviewDetail(postagem: PostagemResponse) {
    this.router.navigate(['/review', postagem.id], { 
      state: { postagemData: postagem } 
    });
  }

  handleSearchPost(): void {
    const termo = this.buscaInputPost.trim();
    this.termoBuscaPost.next(termo ? termo : undefined);
  }

  clearSearchPost(): void {
    this.buscaInputPost = "";
    this.termoBuscaPost.next(undefined);
  }

}