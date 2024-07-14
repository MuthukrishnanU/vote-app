import { Injectable, signal } from '@angular/core';
import { registeredUserList, User } from './registeredUsersListSample';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  //isUserLoginAuth = false;
  registeredUsersListWhole : User[] = [];
  registeredUsersIdList : any = [];
  userNotFound = false;
  loggedInUser = signal('');
  resTime = (new Date()).getHours() > 17;
  canViewResults = new BehaviorSubject<boolean>(this.resTime);
  get isUserLoginAuth() : boolean{
    let isLogIn = localStorage.getItem('isLogIn');
    return (this.loggedInUser() || isLogIn) ? true: false
  };
  constructor() { this.registeredUsersListWhole = registeredUserList }
  getUserLoggedIn(){ return this.isUserLoggedIn }
  setUserLoggedIn(){ this.isUserLoggedIn.next(true) }
  //setUserLoginAuth(){ this.isUserLoginAuth = true }
  getCanViewResults(){ return this.canViewResults }
  setCanViewResults(){ this.canViewResults.next(true) }
  getRegisteredUsersList(){ return this.registeredUsersListWhole }
  setRegisteredUsersList(data : any){
    this.registeredUsersListWhole = data
  }
  removeDups = (arr: any[]): any[] => { return [...new Set(arr)] }
  getRegisteredUsersIdList(){
    for(let u of this.registeredUsersListWhole){ this.registeredUsersIdList.push(u.employeeId) }
    this.registeredUsersIdList = this.removeDups(this.registeredUsersIdList);
    return this.registeredUsersIdList;
  }
  setUserNotFound(){ this.userNotFound = true }
  getUserNotFound(){ return this.userNotFound }
  setLoggedInUser(user: any){ this.loggedInUser.set(user) }
  getLoggedInUser(){ return this.loggedInUser() }
  getLoggedInUserDetails(){ return this.registeredUsersListWhole.find(usr => usr.employeeId==this.loggedInUser()) }
}