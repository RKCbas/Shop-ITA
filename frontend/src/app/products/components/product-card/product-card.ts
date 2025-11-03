import { SlicePipe } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [
    SlicePipe
  ],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<any>()

}
