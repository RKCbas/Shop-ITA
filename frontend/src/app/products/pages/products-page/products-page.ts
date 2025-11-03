import { Component, inject } from '@angular/core';
import { ProductsList } from "@products/components/products-list/products-list";
import { ProductsService } from '@products/services/product.service';
import { rxResource } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-products-page',
  imports: [ProductsList],
  templateUrl: './products-page.html',
})
export class ProductsPage {

  private readonly productsService = inject(ProductsService)

  productsResource = rxResource({
    loader: () => {
       return this.productsService.getProducts()
    }
  })

}
