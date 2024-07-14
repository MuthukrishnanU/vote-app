import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAuthServiceService } from '../../services/user-auth-service.service';
import { User } from '../../services/registeredUsersListSample';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  loginForm = new FormGroup({
    employeeId: new FormControl<string>('', Validators.required),
    employeePassword: new FormControl<string>('', Validators.required),
  });
  userAuthService = inject(UserAuthServiceService);
  router = inject(Router);
  registeredUserIdList : String[] | undefined = [];
  registeredUserList : User[] = [];
  logInUser : String | undefined = '';
  employeeIdErr = false;
  passwordErr = false;
  passwordUnmatchedErr = false;
  onLogin(){
    console.log(this.loginForm.value);
    this.employeeIdErr = (!this.loginForm.value.employeeId || this.loginForm.value.employeeId.length < 5);
    this.passwordErr = (!this.loginForm.value.employeePassword || this.loginForm.value.employeePassword.length < 5);
    this.logInUser = this.loginForm.value.employeeId?.toString()!;
    this.registeredUserIdList = this.userAuthService.getRegisteredUsersIdList();
    this.registeredUserList = this.userAuthService.getRegisteredUsersList();
    console.log(this.registeredUserIdList);
    console.log(this.registeredUserList);
    if(!this.employeeIdErr && !this.passwordErr){
      if(this.registeredUserIdList?.includes(this.logInUser)){
        this.userAuthService.setLoggedInUser(this.logInUser);
        this.userAuthService.setUserLoggedIn();
        let logInUserDtls = this.registeredUserList.filter(item => item.employeeId==this.logInUser);
        if(this.loginForm.value.employeePassword == logInUserDtls[0].password){
          //this.userAuthService.setUserLoginAuth();
          localStorage.setItem('isLogIn', 'true');
          this.router.navigateByUrl('vote');
        }
        else{
          this.passwordUnmatchedErr = true;
          console.log('Password not matched');
        }
      }
      else{
        this.userAuthService.setUserNotFound();
        this.router.navigateByUrl('register');
      }
    }
  }
}
