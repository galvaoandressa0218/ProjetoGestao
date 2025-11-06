import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, switchMap, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioService, UsuarioResponse } from '../../services/usuario.service';

@Component({
  selector: 'app-search-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-user-modal.component.html',
  styleUrls: ['./search-user-modal.component.css']
})
export class SearchUserModalComponent implements OnInit {
  
  @Output() closeModal = new EventEmitter<void>();

  usuariosEncontrados$: Observable<UsuarioResponse[]>;
  private termoBuscaUsuario = new BehaviorSubject<string | undefined>(undefined);
  public buscaInputUsuario: string = "";

  constructor(private usuarioService: UsuarioService) {
    this.usuariosEncontrados$ = new Observable();
  }

  ngOnInit(): void {
    // Lógica de busca de usuário
    this.usuariosEncontrados$ = this.termoBuscaUsuario.pipe(
      switchMap(termo => {
        // Só busca se o termo tiver 3+ caracteres
        if (termo && termo.length >= 3) { 
          return this.usuarioService.getUsuarios(termo).pipe(
            catchError(err => {
              console.error("Erro ao buscar usuários:", err);
              return of([]); // Retorna array vazio em caso de erro
            })
          );
        }
        return of([]); // Retorna array vazio se não houver termo
      })
    );
  }

  handleSearchUser(): void {
    const termo = this.buscaInputUsuario.trim();
    this.termoBuscaUsuario.next(termo ? termo : undefined);
  }

  handleCancel() {
    this.closeModal.emit();
  }
}