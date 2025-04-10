import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
export const tokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const token: string = cookieService.get('token')
  if(token){
    req = req.clone({
      setHeaders: {authorization: `Bearer ${token}`}
    })
  }

  return next(req);

  
};
