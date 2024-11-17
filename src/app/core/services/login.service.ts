import {inject, Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {TokenResponse, User} from "../models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiService: ApiService = inject(ApiService);
  private  url: string = '/auth';

  public login(account: User) : Observable<TokenResponse> {
    return this.apiService.post<TokenResponse>(`${this.url}`, account);
  }
}
