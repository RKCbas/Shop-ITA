import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class ProductsService {

  private readonly http = inject(HttpClient);

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/products`)
      .pipe(
        tap(resp => console.log(resp))
      )
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get<any>(`${baseUrl}/products/find`, { params: { query } })
      .pipe(
        tap(resp => console.log(resp))
      )
  }

}
