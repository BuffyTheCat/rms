import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User, AuthResponce } from '../shared/interfaces/global-info-interface';
import { Observable, throwError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class AuthenticationService {
    constructor(private http: HttpClient) { }

    get token(): string {
        const expDate = new Date(localStorage.getItem('token-exp'));
        if (new Date() > expDate) {
            this.logout();
            return null;
        }

        return localStorage.getItem('token');
    }

    login(user: User): Observable<any> {        
        let newUser = {...user, returnSecureToken: true};        
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, newUser)
        .pipe(
            tap(this.setToken),
        )
    }

    logout() {
        this.setToken(null);
    }

    isAunthenticated(): boolean {
        return !!this.token
    }

    private setToken(responce: AuthResponce | null) {
        if (responce) {
            const expDate = new Date(new Date().getTime() + +responce.expiresIn * 1000);
            localStorage.setItem('token', responce.idToken)
            localStorage.setItem('token-exp', expDate.toString());
        } else {
            localStorage.clear();
        }
    }

    private setCookie(responce: AuthResponce | null) {
        if (responce) {
            document.cookie = `rememberMe=true; max-age=${30*24*60*60}`;
            document.cookie = `email=${responce.email}; max-age=${30*24*60*60}`;
        }
    }

    checkAnswer({answer, rememberMe}) {
        // sent request 
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, { answer })
        .pipe(
            tap((rememberMe) => {
                if (rememberMe) {
                    this.setCookie
                }
            })
        )
    }

    sendAnswer({answers}) {
        // sent request 
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, { answers })
    }
}