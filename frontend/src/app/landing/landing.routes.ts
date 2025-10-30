import { Routes } from "@angular/router";
import { LandingPage } from "./pages/landing-page/landing-page";

const landingRoutes: Routes = [
  {
    path: '',
    component: LandingPage
  },
  {
    path: '**',
    redirectTo: ''
  },
]

export default landingRoutes;
