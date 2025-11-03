import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsList } from "@products/components/products-list/products-list";
import { ProductsService } from '@products/services/product.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-search-page',
  imports: [
    ProductsList,
    JsonPipe
  ],
  templateUrl: './search-page.html',
})
export class SearchPage implements OnInit {

  searchQuery = signal<string>('');

  private readonly route = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService)

  productsResource = rxResource({
    request: () => ({ query: this.searchQuery() }),
    loader: ({ request }) => {
      let query = request.query.trim()

      if (!query.trim()) return of([])

      return this.productsService.searchProducts(query)
    }
  })

  ngOnInit() {
    // Leer el query param
    this.route.queryParams.subscribe(params => {
      const query = params['query'];
      if (query) {
        this.searchQuery.set(query);
      }
    });
  }


}
