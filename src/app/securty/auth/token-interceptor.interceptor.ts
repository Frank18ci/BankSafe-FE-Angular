import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';
export const tokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
    const router = inject(Router);
  const token: string = cookieService.get('token')
  if(token){
    req = req.clone({
      setHeaders: {authorization: `Bearer ${token}`}
    })
  }

return next(req).pipe(
    catchError((error) => {
      if (error.status === 403) {
        cookieService.delete('token');
        cookieService.delete('username');
        cookieService.delete('user');
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    })
  );

  
};
