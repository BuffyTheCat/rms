import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAunthenticated()) {
            return true
        } else {
            this.authService.logout();
            this.router.navigate(['/login'], {
                queryParams: {
                    auth: false
                }
            })
        }
    }
}