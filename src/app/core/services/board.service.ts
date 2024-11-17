import {inject, Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Board, User} from "../models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private url = '/board';
  private apiService: ApiService = inject(ApiService);

  public getAll(userGuid: string | undefined): Observable<Board[]> {
    const url = userGuid ? `${this.url}/all/${userGuid}` : this.url;
    return this.apiService.get<Board[]>(url);
  }

}
