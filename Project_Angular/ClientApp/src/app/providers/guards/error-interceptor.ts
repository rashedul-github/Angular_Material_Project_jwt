import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotifyService } from '../../Services/notify.service';
import { AuthenticationService } from '../../Services/authentication.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private notifyService: NotifyService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      //console.log(err);
      if (err.status == 401) {
        //this.router.navigateByUrl('/access-denied')
        this.notifyService.message("Access-denied!, login to access the resource.", "DISMISS");
      }
      if (err.status == 403) {
        //this.router.navigateByUrl('/forbidden')
        this.notifyService.message("Forbidden!, your credentials does not allow to access the resource", "DISMISS");
      }
      const error = err.message || err.statusText || err.toString();
      //console.log(err.statusText);
      return throwError(error);

    }));
  }
}

