import { SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Product } from '@products/interface/product.interface';

@Component({
  selector: 'app-product-card',
  imports: [
    SlicePipe
  ],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Product>()
}
