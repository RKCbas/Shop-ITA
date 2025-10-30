import { Component } from '@angular/core';
import { Navbar } from "@products/components/navbar/navbar";
import { Footer } from "@products/components/footer/footer";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products-layout',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './products-layout.html',
})
export class ProductsLayout { }
