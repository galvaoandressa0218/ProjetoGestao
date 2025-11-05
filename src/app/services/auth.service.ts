import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap } from 'rxjs';
import { environment } from '../environment';

// Interfaces (presumidas com base no seu código)
interface LoginRequest {
  email: string;
  senha?: string;
  nome?: string;
}

interface LoginResponse {
  token: string;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_ID_KEY = 'auth_user_id';

  // Propriedade para verificar se estamos no navegador
  private isBrowser: boolean;

  constructor(
    private router: Router, 
    private http: HttpClient,
    // Injete o PLATFORM_ID para saber onde o código está rodando
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Verifique se é um navegador
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(credentials: LoginRequest): Observable<any> {
    
    // ✅ Guard
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_ID_KEY);
    }

    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        // ✅ Guard
        if (this.isBrowser) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
        }
      }),
      switchMap(response => {
        return this.http.get<Usuario>(`${this.apiUrl}/usuarios?email=${credentials.email}`);
      }),
      tap(usuario => {
        // ✅ Guard
        if (this.isBrowser) {
          if (usuario && usuario.id) {
            localStorage.setItem(this.USER_ID_KEY, usuario.id.toString());
            this.router.navigate(['/home']);
          } else {
            throw new Error("Usuário logado não encontrado na busca por email.");
          }
        }
      })
    );
  }

  register(userInfo: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios`, userInfo).pipe(
      tap(() => {
        this.router.navigate(['/login']);
      })
    );
  }

  logout() {
    // ✅ Guard
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_ID_KEY);
      this.router.navigate(['/login']);
    }
  }

  getToken(): string | null {
    // ✅ Guard
    if (this.isBrowser) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null; // Retorna nulo se estiver no servidor
  }

  getUserId(): number | null {
    // ✅ Guard
    if (this.isBrowser) {
      const id = localStorage.getItem(this.USER_ID_KEY);
      return id ? Number(id) : null;
    }
    return null; // Retorna nulo se estiver no servidor
  }

  isLoggedIn(): boolean {
    // Este método agora é seguro, pois getToken() é seguro
    const token = this.getToken();
    return !!token;
  }
}