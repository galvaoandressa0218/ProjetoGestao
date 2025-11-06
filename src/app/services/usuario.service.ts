import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

// Modelo para a resposta do usuário
export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  getUsuarios(termo: string): Observable<UsuarioResponse[]> {
    let params = new HttpParams().set('termo', termo);
    return this.http.get<UsuarioResponse[]>(this.apiUrl, { params });
  }
}