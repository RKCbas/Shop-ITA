import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '@auth/interfaces/auth.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, map, catchError, of } from 'rxjs';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly _authStatus = signal<AuthStatus>('checking');
  private readonly _user = signal<Usuario | null>(null);
  private readonly _token = signal<string | null>(localStorage.getItem('token'));

  user = computed(() => this._user());
  isAdmin = computed(() => this._user()?.rol === 'admin');
  token = computed(() => this._token());

  checkStatusResource = rxResource({
    loader: () => this.checkStatus()
  })

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._user()) return 'authenticated';

    return 'not-authenticated'

  });

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
      email: email,
      password: password,
    }).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    )
  }

  register(nombre: string, email: string, password: string) {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/register`, {
      nombre: nombre,
      email: email,
      password: password,
    }).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    )
  }

  checkStatus(): Observable<boolean> {

    if (!this.token()) {
      this.logout();
      return of(false);
    }

    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, {}).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    )

  }

  logout() {
    this._authStatus.set('not-authenticated');
    this._user.set(null);
    this._token.set(null);

    localStorage.removeItem('token')

  }

  private handleAuthSuccess(resp: AuthResponse): boolean {

    const { token, usuario } = resp

    this._user.set(usuario);
    this._authStatus.set('authenticated');
    this._token.set(token);

    localStorage.setItem('token', token)

    return true
  }

  private handleAuthError(error: any): Observable<boolean> {
    this.logout()
    return of(false)
  }

}
