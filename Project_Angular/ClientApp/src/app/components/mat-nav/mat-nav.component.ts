import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { menuList } from '../../models/constant';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'mat-nav',
  templateUrl: './mat-nav.component.html',
  styleUrls: ['./mat-nav.component.css']
})
export class MatNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,
    private userService: UserService,
  ) { }
  doLogout() {
    this.userService.logout();
  }
  get isLogged(): boolean {
    return this.userService.isLogged;
  }
  get userName() {
    return this.userService.userName;
  }
  menuItems = menuList;
  config = {
    paddingAtStart: true,
    listBackgroundColor: '#fff',
    fontColor: 'rgb(8, 54, 71)',
    backgroundColor: '#fff',
    selectedListFontColor: 'red',
    collapseOnSelect: true
  };


  selectedItem(event) {
    if (event.link) {
      //console.log(event.link)
      this.router.navigateByUrl(event.link)
    }
  }
}
