import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {AuthenticationService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {ApplicationConfigService} from "./application-config.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private applicationConfigService: ApplicationConfigService,
        private authenticationService: AuthenticationService, private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const serverApiUrl = this.applicationConfigService.getEndpointFor('');
        if (!request.url || (request.url.startsWith('http') && !(serverApiUrl && request.url.startsWith(serverApiUrl)))) {
            return next.handle(request);
        }

        const token: string | null =
            sessionStorage.getItem('X-Token') ?? localStorage.getItem('X-Token');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 || err.status === 403) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                this.router.navigate(['/account/login']);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
