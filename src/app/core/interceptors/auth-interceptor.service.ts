import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {AuthService} from "../services";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  private authService: AuthService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthToken;

    if(authToken == null){
      this.authService.logout();
    }

    // Clonar a requisição original e substituir o cabeçalho de autorização
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `${authToken}`)
    });

    // Enviar a requisição clonada com o cabeçalho de autorização
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(error);
      })
    );;
  }
}
