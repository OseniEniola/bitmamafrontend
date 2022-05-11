import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { LandingComponent } from "./landing/landing.component";
import { SigninComponent } from "./signin/signin.component";

const routes: Routes = [
  {
    path: "", redirectTo: "signin", pathMatch: "full",
  },
  {
    path: "signin", component: SigninComponent
  },
  { path: "login", component: LandingComponent, canActivate: [AuthGuard] },
  {
    path: "", redirectTo: "signin", pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
