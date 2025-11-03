import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '@auth/services/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass],
  templateUrl: './navbar.html',
})
export class Navbar {

  searchQuery = signal<string>('')

  authService = inject(AuthService)

  router = inject(Router)

  onSearch() {
    const value = this.searchQuery().trim();

    if (!value) {
      console.log('Búsqueda vacía');
      return;
    }

    this.router.navigate(['/products/search'], {
      queryParams: { query: value },
    });
  }

}
