import { Component, input } from '@angular/core';
import { ProductCard } from "../product-card/product-card";

@Component({
  selector: 'app-products-list',
  imports: [ProductCard],
  templateUrl: './products-list.html',
})
export class ProductsList {

  products = input.required<any[]>()

}
