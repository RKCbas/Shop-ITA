import { Routes } from "@angular/router";
import { ProductsLayout } from "./layout/products-layout/products-layout";
import { ProductsPage } from "./pages/products-page/products-page";
import { SearchPage } from "./pages/search-page/search-page";


const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsLayout,
    children:[
      {
        path: 'all',
        component: ProductsPage
      },
      {
        path: 'search',
        component: SearchPage
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  }
]

export default productsRoutes;
