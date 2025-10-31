import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsList } from "@products/components/products-list/products-list";

@Component({
  selector: 'app-search-page',
  imports: [ProductsList],
  templateUrl: './search-page.html',
})
export class SearchPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  searchQuery = signal<string>('');

  ngOnInit() {
    // Leer el query param
    this.route.queryParams.subscribe(params => {
      const query = params['query'];
      if (query) {
        this.searchQuery.set(query);
        this.searchProducts(query);
      }
    });
  }

  searchProducts(query: string) {
    console.log('Buscando:', query);
    // Aquí llamas a tu servicio/endpoint
    // this.productService.search(query).subscribe(...)
  }
}
