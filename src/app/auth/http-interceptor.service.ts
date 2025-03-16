import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token && !router.url.includes('/sign-in')) {
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }

  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        const backendMessage = err.error?.message || err.error || 'Erro desconhecido';

        switch (err.status) {
          case 401:
            Swal.fire({
              icon: 'error',
              title: 'Erro de autenticação',
              text: backendMessage || 'Usuário ou senha incorretos.',
              confirmButtonText: 'Tentar novamente'
            });
            router.navigate(['/sign-in']);
            break;
          case 403:
            Swal.fire({
              icon: 'error',
              title: 'Acesso negado',
              text: backendMessage || 'Você não tem permissão para acessar esta área.',
              confirmButtonText: 'Voltar'
            });
            router.navigate(['/sign-in']);
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Erro inesperado',
              text: backendMessage || 'Ocorreu um erro desconhecido.',
              confirmButtonText: 'Ok'
            });
            console.error('Detalhes do erro:', err);
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro na conexão',
          text: 'Verifique sua conexão com a internet e tente novamente.',
          confirmButtonText: 'Tentar novamente'
        });
        console.error('Erro não HTTP:', err);
      }

      return throwError(() => err);
    })
  );
};
