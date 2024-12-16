import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs';

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
  const spinnerService = inject(NgxSpinnerService);

  // Example of showing the spinner before request
  spinnerService.show();
  setTimeout(() => {
    spinnerService.hide();
  }, 1000);
  return next(req);
}
