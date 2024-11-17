import {inject, Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {User} from "../models";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = '/user';
  private apiService: ApiService = inject(ApiService);

  public createUser(user: User): Observable<User> {
    return this.apiService.post<User>(this.url, user);
  }

}
