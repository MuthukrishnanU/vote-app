import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import {UserAuthServiceService} from './services/user-auth-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [UserAuthServiceService]
})
export class AppComponent implements OnInit {
  title = 'voteApp';
  loggedInUser = '';
  loggedInUserDetails : any = {};
  displaySidebar = false;
  userAuthService = inject(UserAuthServiceService);
  router = inject(Router);
  isUserLoggedIn = false;
  canViewResults = false;
  constructor(){
    this.userAuthService.isUserLoggedIn.subscribe(val => this.isUserLoggedIn = val);
    this.userAuthService.canViewResults.subscribe(val =>this.canViewResults = val);
  }
  contactUs(){
    console.log('Please contact Muthukrishnan in +919769608204 or ping him at 1040046');
  }
  onLogout(){
    this.userAuthService.isUserLoggedIn.next(false);
    localStorage.removeItem('isLogIn');
    this.router.navigateByUrl('');
  }
  toggleSideBar() {
    this.displaySidebar = !this.displaySidebar;
  }
  toLoginFromSideBar(){
    this.displaySidebar = false;
    this.router.navigateByUrl('login');
  }
  toRegisterFromSideBar(){
    this.displaySidebar = false;
    this.router.navigateByUrl('register');
  }
  toLogoutFromSidebar(){
    this.displaySidebar = false;
    localStorage.removeItem('isLogIn');
    this.userAuthService.isUserLoggedIn.next(false);
    this.router.navigateByUrl('');
  }
  toContactUsFromSideBar(){
    this.displaySidebar = false;
    console.log('Please contact Muthukrishnan in +919769608204 or ping him at 1040046');
  }
  toResultsFromSidebar(){
    this.displaySidebar = false;
    this.router.navigateByUrl('results');
  }
  ngOnInit(): void {
    this.loggedInUser = this.userAuthService.getLoggedInUser();
    this.loggedInUserDetails = this.userAuthService.getLoggedInUserDetails();
    let url = this.router.url;
    if((!this.loggedInUser || !this.loggedInUserDetails) && (url=='results' || url=='vote' || url=='ack')){
      localStorage.removeItem('isLogIn');
      this.router.navigateByUrl('login');
    }
  }
}