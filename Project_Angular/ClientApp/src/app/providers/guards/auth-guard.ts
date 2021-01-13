import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';
import { UserService } from '../../Services/user.service';
import { NotifyService } from '../../Services/notify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService,
    private notifyService: NotifyService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //if not logged in reject i.e., return false
    if (this.userService.isLogged) {
      if (route.data.AllowedRoles && !this.userService.roleMatch(route.data.AllowedRoles)) {
        this.notifyService.message("Forbidden: you are not allwed to access the resource", "DISMISS");
        return false;
      }

      return true;
    }
    else {
      this.notifyService.message("You must login to access the resource.", "DISMISS")
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }


  }
}

