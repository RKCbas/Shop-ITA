import { Component } from '@angular/core';
import { RouterOutlet } from "../../../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";
import { Navbar } from "@products/components/navbar/navbar";
import { Footer } from "@products/components/footer/footer";

@Component({
  selector: 'app-products-layout',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './products-layout.html',
})
export class ProductsLayout { }
