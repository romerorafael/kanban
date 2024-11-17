import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslatePipe } from "@ngx-translate/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {AuthService, LoginService} from "../../core/services";
import {User} from "../../core/models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    TranslatePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService],
})
export class LoginComponent{
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  protected hide: boolean = false;
  protected loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    }
  );

  protected onSubmit() {
    const email:string  = this.loginForm.get('email')?.value;
    const password:string  = this.loginForm.get('password')?.value;
    const user: User = {
      email: email,
      password: password
    }

    this._authService.login(user);
  }
}
