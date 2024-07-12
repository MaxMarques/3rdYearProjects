import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private oauthService: OAuthService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
            }
        });

        return next.handle(req).pipe(
            tap(x => x, err => {
                console.error(`Error performing request, status code = ${err.status}`);
            })
        );
    }
}