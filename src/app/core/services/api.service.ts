import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://localhost:44318/api'; // Defina a URL base da API

  constructor(private http: HttpClient) {}

  private handleError (error: HttpErrorResponse): string {

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.status === 204) {
        errorMessage = 'No content available.';
      } else if (error.status === 409) {
        errorMessage = 'Conflict error: ' + error.error.detail;
      } else if (error.status === 400) {
        errorMessage = 'Bad request. Please check your input.';
      }
    }
    console.error(errorMessage);
    return errorMessage;
  }

  //Método GET genérico
  public get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${url}`, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.handleError(error)));
      })
    );
  }

  // Método POST genérico
  public post<T>(url: string, body: any, params?: HttpParams): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.handleError(error)));
      })
    );
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${url}`, body).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.handleError(error)));
      })
    );
  }


  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${url}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.handleError(error)));
      })
    );
  }
}
