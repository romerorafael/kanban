import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {TokenInfos, TokenResponse, User} from "../models";
import {jwtDecode} from "jwt-decode";
import {LoginService} from "./login.service";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _router: Router = inject(Router);
  private _loginService: LoginService = inject(LoginService);
  private _toastrService: ToastrService = inject(ToastrService);
  private _translate: TranslateService = inject(TranslateService);

  public get tokenInfo() : TokenInfos{
    return this.getTokenInfos();
  };

  public login(user: User):void {
    this._loginService.login(user).subscribe({
      next: (result: TokenResponse): void => {
        localStorage.setItem('token', JSON.stringify(result));
      },
      error: error => {
        this._translate.get('error_login').subscribe((result): void => {
          this._toastrService.error(error, result);
        })
      },
      complete: () => {
        window.location.reload();
      }
    })
  }

  public get getAuthToken() : string {
    return localStorage.getItem('token') ?? "";
  }

  public isLogged() : boolean  {
    let token: string | null = localStorage.getItem('token');
    return token != null;
  }

  public async logout() {
    localStorage.clear();
    await this._router.navigate(['/login']);
  }

  private getTokenInfos(){
    const token = this.getAuthToken;
    const jwt = jwtDecode(token);

    const tokenInfos: TokenInfos = {
      id: jwt.nameid,
      name: jwt.unique_name,
      email: jwt.email,
      permissions: jwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authentication'],
      expiration: jwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/expiration"]
    }

    return tokenInfos;
  }

}
