import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable, BehaviorSubject, of, switchMap } from 'rxjs';
import { PostagemResponse, NewPostagemData } from '../../model/psotagem.model';
import { PostagemService } from '../../services/postagem.service';
import { AuthService } from '../../services/auth.service';
import { NewReviewModalComponent } from '../../modal/new-review-modal/new-review-modal.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NewReviewModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent implements OnInit {
  showNewReview = false;
  showError = false;
  
  postagens$: Observable<PostagemResponse[]>;
  private refreshSignal = new BehaviorSubject<void>(undefined);

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private authService: AuthService
  ) {
    this.postagens$ = new Observable();
  }

  ngOnInit(): void {
    this.postagens$ = this.refreshSignal.pipe(
      switchMap(() => this.postagemService.getPostagens())
    );
  }

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
}