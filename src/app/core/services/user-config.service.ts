import {inject, Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {UserConfig} from "../models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

  private url = '/userconfig';
  private apiService: ApiService = inject(ApiService);

  public createUserConfig(userConfig: UserConfig): Observable<UserConfig> {
    return this.apiService.post<UserConfig>(this.url, userConfig);
  }
}
