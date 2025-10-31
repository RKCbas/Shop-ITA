import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class ProductsService {

  private readonly http = inject(HttpClient);

  getProducts() {
    console.log("Obtener productos");

  }

  searchProducts(query: string) {
    console.log(`obtener productos por query: ${query}`)
  }

}
