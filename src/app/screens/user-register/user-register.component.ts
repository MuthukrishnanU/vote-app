import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthServiceService } from '../../services/user-auth-service.service';
import { User } from '../../services/registeredUsersListSample';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {
  registerForm = new FormGroup({
    employeeId: new FormControl<string>('', Validators.required),
    employeeName: new FormControl<string>('', Validators.required),
    employeePassword: new FormControl<string>('', Validators.required),
    employeeGender: new FormControl<string>('', Validators.required),
  });
  userAuthService = inject(UserAuthServiceService);
  router = inject(Router);
  formErr = false;
  userAlreadyExists = false;
  userNotFound = this.userAuthService.userNotFound || false;
  registeredUserIdList : String[] | undefined = [];
  registeredUserList : User[] = [];
  ngOnInit(): void {
    this.registeredUserIdList = this.userAuthService.getRegisteredUsersIdList();
    this.registeredUserList = this.userAuthService.getRegisteredUsersList();
    this.userNotFound = this.userAuthService.userNotFound;
  }
  onRegister(){
    console.log(this.registerForm.value);
    if(this.registerForm.valid){
      this.userAuthService.showLoader();
      this.userAuthService.callRegister({'employeeId': this.registerForm.value.employeeId?.toString(), 'name': this.registerForm.value.employeeName, 'password': this.registerForm.value.employeePassword, 'gender': this.registerForm.value.employeeGender }).subscribe({
        next: (res: any) => {
          console.log(res);
          this.userAuthService.hideLoader();
          this.router.navigateByUrl('login');
        },
        error: (error: any) => {
          console.log(error);
          this.userAuthService.hideLoader();
          if(error.error.error == 'UAE'){
            this.userAlreadyExists = true;
          }
        }
      });
      /*let regInUserDtls = this.registeredUserList.filter(item => item.employeeId==this.registerForm.value.employeeId);
      if(regInUserDtls.length > 0){
        this.userAlreadyExists = true;
      }
      else{
        let tmpRegObj : User = {
          'employeeId': this.registerForm.value.employeeId?.toString(),
          'name': this.registerForm.value.employeeName,
          'password': this.registerForm.value.employeePassword,
          'gender': this.registerForm.value.employeeGender,
          'hasVoted': false,
          'gotVotes': []
        };
        this.registeredUserList.push(tmpRegObj);
        this.router.navigateByUrl('login');
      }*/
    }
    else{
      this.formErr = true;
      console.log('Please ensure all details of the form are entered');
    }
  }
}
