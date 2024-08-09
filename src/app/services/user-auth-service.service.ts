import { Injectable, signal } from '@angular/core';
import { registeredUserList, User } from './registeredUsersListSample';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  //isUserLoginAuth = false;
  registeredUsersListWhole : User[] = [];
  registeredUsersIdList : any = [];
  loggedInUserDetail = new BehaviorSubject<any>({});
  userNotFound = false;
  loggedInUser = signal('');
  resTime = (new Date()).getHours() > 17;
  canViewResults = new BehaviorSubject<boolean>(this.resTime);
  get isUserLoginAuth() : boolean{
    let isLogIn = localStorage.getItem('isLogIn');
    return (this.loggedInUser() || isLogIn) ? true: false
  };
  constructor(private httpClient: HttpClient) {
    this.registeredUsersListWhole = registeredUserList
  }
  getUserLoggedIn(){ return this.isUserLoggedIn }
  setUserLoggedIn(){ this.isUserLoggedIn.next(true) }
  //setUserLoginAuth(){ this.isUserLoginAuth = true }
  getCanViewResults(){ return this.canViewResults }
  setCanViewResults(val:boolean){ this.canViewResults.next(val) }
  getRegisteredUsersList(){ return this.registeredUsersListWhole }
  setRegisteredUsersList(data : any){
    this.registeredUsersListWhole = data
  }
  getLoggedInUserDetail(){ return this.loggedInUserDetail }
  setLoggedInUserDetail(usrDtl: any){ this.loggedInUserDetail.next(usrDtl) }
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
  beUrl = 'https://voteappbe.onrender.com/api';
  callLogin(req: any){
    //API call to /login
    return this.httpClient.post(`${this.beUrl}/login`, {"employeeId": req.employeeId, "password": req.password});
  }
  callRegister(req: any){
    //API call to /register
    return this.httpClient.post(`${this.beUrl}/register`, {"employeeId": req.employeeId, "name": req.name, "password": req.password, "gender": req.gender});
  }
  callVote(req: any){
    //API call to /userVote
    return this.httpClient.post(`${this.beUrl}/userVote`, {"employeeId": req.employeeId, "maleChoice": req.maleChoice, "femaleChoice": req.femaleChoice});
  }
  callResults(){
    //API call to /results
    return this.httpClient.get(`${this.beUrl}/results`);
  }
}