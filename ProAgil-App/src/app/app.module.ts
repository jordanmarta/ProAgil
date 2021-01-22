import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastrModule } from "ngx-toastr";

import { EventoService } from "./_services/evento.service";

import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { EventosComponent } from "./eventos/eventos.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PalestranteComponent } from "./palestrante/palestrante.component";
import { ContatosComponent } from "./contatos/contatos.component";
import { TituloComponent } from "./_shared/titulo/titulo.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DateTimeFormatPipePipe } from "./_helps/DateTimeFormatPipe.pipe";
import { UserComponent } from "./user/user.component";
import { RegistrationComponent } from "./user/registration/registration.component";
import { LoginComponent } from "./user/login/login.component";
import { AuthInterceptor } from "./auth/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    EventosComponent,
    DashboardComponent,
    PalestranteComponent,
    ContatosComponent,
    TituloComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    DateTimeFormatPipePipe
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    EventoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
