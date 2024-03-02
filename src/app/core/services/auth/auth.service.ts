import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {User} from '../../models/auth.models';
import {CommandURL} from '../../commands/api.command';
import {GlobalVariable} from '../../store/global.variable';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    user: User;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): User {
        if (!GlobalVariable.getAuth().currentUser) {
            GlobalVariable.restoreAuth();
        }
        this.user = GlobalVariable.getAuth().currentUser;
        return this.user;
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {

        // const data = JSON.parse()
        return this.http.post<any>(CommandURL.LOGIN, {email, password})
            .pipe(map(data => {
                // login successful if there's a jwt token in the response
                if (data && data.token) {
                    // store user details and jwt in cookie
                    sessionStorage.setItem('X-Token', data.token);
                    const authenticationData = {
                        currentUser: {
                            userId: data.user.id,
                            fullName : data.user.fullName,
                            userCode: data.user.code,
                            avatarUrl: data.user.avatarUrl
                        }
                    };
                    GlobalVariable.setAuth(authenticationData);
                    // this.cookieService.setCookie('currentUser', JSON.stringify(user), 1);
                }
                return data.user;
            }));


       
    }

    /**
     * Logout the user
     */
    logout() {
        GlobalVariable.clearVariables();
        localStorage.removeItem('note');
        this.user = null;
        sessionStorage.removeItem('X-Token');
        localStorage.removeItem('X-Token');
        sessionStorage.removeItem('language');
        this.router.navigate(['/account/login'], {queryParams: {returnUrl: '/home-page'}});
        this.user = null;
    }

    resetPassword(payload:any){
        return this.http.post<any>(CommandURL.RESET_PASSWORD,payload);
    }
}

