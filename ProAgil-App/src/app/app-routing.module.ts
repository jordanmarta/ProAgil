import { AuthGuard } from "./auth/auth.guard";
import { RegistrationComponent } from "./user/registration/registration.component";
import { LoginComponent } from "./user/login/login.component";
import { UserComponent } from "./user/user.component";
import { ContatosComponent } from "./contatos/contatos.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PalestranteComponent } from "./palestrante/palestrante.component";
import { EventosComponent } from "./eventos/eventos.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "user",
    component: UserComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "registration", component: RegistrationComponent }
    ]
  },

  { path: "eventos", component: EventosComponent, canActivate: [AuthGuard] },
  { path: "palestrantes", component: PalestranteComponent, canActivate: [AuthGuard] },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "contatos", component: ContatosComponent, canActivate: [AuthGuard] },
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "**", redirectTo: "dashboard", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
