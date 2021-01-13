import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, empty, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConfig } from '../models/constant';
import { User } from '../models/user';
import { LoginViewModel } from '../models/view-models/login-view-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;
  @Output() loginEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem("user-data")));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(data: LoginViewModel) {
    return this.http.post<any>(`${AppConfig.apiUrl}/Account/Login`, data)
      .pipe(map(data => {
        let user = this.save(data);
        this.currentUserSubject.next(user);
        this.loginEvent.emit('login');
      }),
        catchError((err, caught) => {
          throwError(err);
          this.currentUserSubject.next(null);
          return empty();
        }));
  }
  logout() {
    sessionStorage.removeItem("user-data");
    this.currentUserSubject.next(null);
    this.loginEvent.emit('logout');
  }
  save(data: any): User {
    const userdata = new User();
    userdata.accessToken = data.token;
    const payload = JSON.parse(window.atob(data.token.split('.')[1]));
    userdata.userName = payload.username;
    userdata.role = payload.role;
    sessionStorage.setItem("user-data", JSON.stringify(userdata));
    return userdata;
  }
  getEmitter() {
    return this.loginEvent;
  }
}
