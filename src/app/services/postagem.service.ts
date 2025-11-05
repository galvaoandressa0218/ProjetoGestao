import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PostagemResponse, NewPostagemData } from '../model/psotagem.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environment'; // Caminho atualizado
import { AuthService } from './auth.service'; // Importa o AuthService

@Injectable({
  providedIn: 'root'
})
export class PostagemService {
  
  private apiUrl = `${environment.apiUrl}/postagens`;

  constructor(
    private http: HttpClient,
    private authService: AuthService // Injeta o AuthService
  ) { }

  getPostagens(termo?: string): Observable<PostagemResponse[]> {
    let params = new HttpParams();
    if (termo) {
      params = params.set('termo', termo);
    }
    return this.http.get<PostagemResponse[]>(this.apiUrl, { params });
  }

  getPostagemById(id: number): Observable<PostagemResponse> {
    return this.http.get<PostagemResponse>(`${this.apiUrl}/${id}`);
  }

  addPostagem(postagemData: Omit<NewPostagemData, 'criadorId'>): Observable<PostagemResponse> {
    
    const userId = this.authService.getUserId();
    if (!userId) {
      throw new Error("ID do usuário não encontrado. Faça login novamente.");
    }

    // Monta o objeto completo que o backend espera
    const newPostagem: NewPostagemData = {
      ...postagemData,
      criadorId: userId
    };
    
    return this.http.post<PostagemResponse>(this.apiUrl, newPostagem);
  }

  deletePostagem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}