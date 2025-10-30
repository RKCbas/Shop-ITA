import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar {

  searchQuery = signal<string>('')

  router = inject(Router)

  onSearch() {
    const value = this.searchQuery().trim();

    if (!value) return;

    this.router.navigate(['/products/search'], {
      queryParams: { query: this.searchQuery() },
    });
  }

}
