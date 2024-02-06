import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  

if (typeof window !== 'undefined') {
  const authToken = localStorage.getItem('stackoverflowToken');

  console.log({authToken})
  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return next(authReq);
  }
}
return next(req);
}

