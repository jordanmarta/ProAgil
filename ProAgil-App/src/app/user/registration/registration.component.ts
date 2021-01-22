import { AuthService } from "./../../_services/auth.service";
import { User } from "./../../_models/User";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

import { ConfirmedValidator } from "./confirmed.validator";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  user: User;

  constructor(
    private authService: AuthService,
    public router: Router,
    public fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.registerForm = this.fb.group(
      {
        fullName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        userName: ["", Validators.required],
        password: ["", [Validators.required, Validators.minLength(4)]],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: ConfirmedValidator("password", "confirmPassword")
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  compararSenhas(fb: FormGroup) {
    const confirmSenhaCtrl = fb.controls["confirmPassword"];

    console.log(`confirmSenhaCtrl: ${confirmSenhaCtrl}`);

    if (confirmSenhaCtrl.errors == null || "mismatch" in confirmSenhaCtrl.errors) {
      if (fb.controls["password"].value !== confirmSenhaCtrl.value) {
        confirmSenhaCtrl.setErrors({ mismatch: true });
      } else {
        confirmSenhaCtrl.setErrors(null);
      }
    }
  }

  cadastrarUsuario() {
    if (this.registerForm.valid) {
      this.user = Object.assign(
        {
          password: this.registerForm.controls["confirmPassword"].value
        },
        this.registerForm.value
      );
      this.authService.register(this.user).subscribe(
        () => {
          this.router.navigate(["/user/login"]);
          this.toastr.success("Cadastrado realizado!");
        },
        error => {
          const erro = error.error;

          erro.array.forEach((element: any) => {
            switch (element.code) {
              case "DuplicateUserName":
                this.toastr.error("Usuário já cadastrado!");
                break;
              default:
                this.toastr.error(`Erro ao cadastrar! CODE: ${element.code}`);
                break;
            }
          });
        }
      );
    }
  }
}
