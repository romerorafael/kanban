import {Component, inject, OnInit} from '@angular/core';
import {MatTab, MatTabGroup, MatTabLabel, MatTabsModule} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";
import {TranslatePipe} from "@ngx-translate/core";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthService} from "../core/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-no-auth',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    MatIcon,
    MatTabLabel,
    MatTabsModule,
    TranslatePipe,
    LoginComponent,
    RegisterComponent,
  ],
  templateUrl: './no-auth.component.html',
  styleUrl: './no-auth.component.scss'
})
export class NoAuthComponent implements OnInit {
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  ngOnInit() {
    if (this._authService.isLogged()){
      this._router.navigate(['/home']);
    }
  }
}
