import { Component } from '@angular/core';
import { ProductsList } from "@products/components/products-list/products-list";

@Component({
  selector: 'app-products-page',
  imports: [ProductsList],
  templateUrl: './products-page.html',
})
export class ProductsPage { }
