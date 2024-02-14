import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, switchMap, BehaviorSubject, filter, take } from 'rxjs';
import { UtilsService } from '../services/utils.service';

@Injectable()

export class RefreshTokenInterceptor implements HttpInterceptor {

    /** Flag to indicate if token refreshing is in progress */
    private isRefreshing = false;

    /** Subject to notify when token is refreshed */
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(public utilsService: UtilsService) { }

    /**
     * Intercepts HTTP requests and handles 401 errors (unauthorized)
     * @param request The intercepted HTTP request
     * @param next The HTTP handler to pass the request to
     * @returns An observable of HTTP events
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error && error.status === 401) {
                    return this.handle401Error(request, next);
                } else {
                    return throwError(() => error);
                }
            })
        );
    }

    /**
     * Handles 401 errors by refreshing the token
     * @param request The original HTTP request
     * @param next The HTTP handler to pass the request to
     * @returns An observable of HTTP events
     */
    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.utilsService.getRefreshToken().pipe(
                switchMap((tokenResponse: any) => {
                    localStorage.setItem('token', tokenResponse.data);
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(tokenResponse.data);
                    return next.handle(this.addTokenToRequest(request, tokenResponse.data));
                }),
                catchError((error: any) => {
                    this.isRefreshing = false;
                    this.utilsService.goToSessionExpired();
                    return throwError(() => error);
                })
            );
        } else {
            // If token is already refreshing, wait and try again with the new token
            return this.refreshTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(() => next.handle(this.addTokenToRequest(request, localStorage.getItem('token'))))
            );
        }
    }

    /**
     * Adds authorization token to the request headers
     * @param request The HTTP request
     * @param token The authorization token
     * @returns A cloned HTTP request with added token header
     */
    private addTokenToRequest(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
        return token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request;
    }


}
