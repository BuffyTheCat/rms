import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { selectMultifactorAccess, selectMultifactorSetting } from '../store/selectors';

@Injectable({providedIn: 'root'})

export class MultifactorGuard implements CanActivate {
    constructor(
        private store: Store<AppState>,
        private router: Router
    ) {}

    multifactorAccess = this.store.select(selectMultifactorAccess);
    multifactorSetting = this.store.select(selectMultifactorSetting);
    answered: boolean = false;
    mfa: boolean = false;
    

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        this.multifactorAccess.subscribe((answered) => {
            this.answered = answered
        })

        this.multifactorSetting.subscribe((mfa) => {
            this.mfa = mfa
        })

        if (this.answered || !this.mfa) {
            return true
        } else {
            this.router.navigate(['/questions'], {
                queryParams: {
                    multifactorAccess: false
                }
            })
        }
        
    }
}