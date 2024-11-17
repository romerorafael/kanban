import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services";
import {inject} from "@angular/core";


export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogged()) {
    return true; // Permite a navegação
  } else {
    await router.navigate(['/login']); // Redireciona para a página de login
    console.log('Something went wrong!');
    return false; // Bloqueia a navegação

  }
};
