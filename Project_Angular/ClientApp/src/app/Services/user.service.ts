import { Injectable } from '@angular/core';
import { Role } from '../models/constant';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.load();
    this.authenticationService.getEmitter().subscribe(x => {
      if (x === "login") {
        this.load();
      }
      if (x === "logout") {
        this.user = null;
      }
    });
  }
  get isLogged() {
    return this.user != null;
  }
  get userName() {
    return this.user ? this.user.userName : null;
  }
  get token() {
    return this.user ? this.user.accessToken : null;
  }
  get role() {
    return this.user.role;
  }
  load() {
    this.user = this.authenticationService.currentUserValue;
    //console.log(this.user);
  }
  logout() {
    this.authenticationService.logout();
  }
  roleMatch(allowedRoles: Role[]) {
    let isMatch = false;
    for (const r of allowedRoles) {
      if (r == this.role) {
        isMatch = true;
        break;
      }
    }
    return isMatch;
  }
}
