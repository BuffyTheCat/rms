import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponce } from '../shared/interfaces/global-info-interface';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ResetPasswordService {
    constructor(private http: HttpClient) { }

    resetPass({idToken, password}): Observable<any> {        
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, {idToken, password})
        .pipe(
            tap(this.setToken),
        )
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
}