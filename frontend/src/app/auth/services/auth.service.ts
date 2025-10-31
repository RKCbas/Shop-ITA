import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '@auth/interfaces/auth.interface';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly _authStatus = signal<AuthStatus>('checking');
  private readonly _user = signal<User | null>(null);
  private readonly _token = signal<string | null>(localStorage.getItem('token'));

  // user = computed(() => this._user());
  // isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);
  // token = computed(() => this._token());



  login(email:string, password:string) {
    console.log(`Hola email: ${email}, contraseña: ${password}`)
  }

  register(fullName:string, email:string, password: string) {
    console.log(`Hola fullName: ${fullName}, email: ${email}, password: ${password}`);
  }




}
