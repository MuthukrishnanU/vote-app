import { Component, OnInit, inject } from '@angular/core';
import { UserAuthServiceService } from '../../services/user-auth-service.service';
import { User } from '../../services/registeredUsersListSample';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-vote',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-vote.component.html',
  styleUrl: './user-vote.component.css'
})
export class UserVoteComponent implements OnInit {
  userAuthService = inject(UserAuthServiceService);
  router = inject(Router);
  loggedInUser = '';
  loggedInUserDetails : any = {};
  registeredUsersList : any = {};
  registeredMaleList : any = {};
  registeredFemaleList : any = {};
  maleChoiceErr = false;
  femaleChoiceErr = false;
  voteForm = new FormGroup({
    maleChoice: new FormControl<string>('', Validators.required),
    femaleChoice: new FormControl<string>('', Validators.required),
  });
  registeredUserIdList : String[] | undefined = [];
  registeredUserList : User[] = [];
  ngOnInit(): void {
    this.loggedInUser = this.userAuthService.getLoggedInUser();
    this.userAuthService.loggedInUserDetail.subscribe(data => this.loggedInUserDetails = data);
    this.registeredUserList = this.userAuthService.getRegisteredUsersList();
    this.registeredUserIdList = this.userAuthService.getRegisteredUsersIdList();
    if(!this.loggedInUser || !this.loggedInUserDetails){
      localStorage.removeItem('isLogIn');
      this.router.navigateByUrl('login');
    }
    this.registeredMaleList = this.registeredUserList.filter((usr:any) => usr.gender=='Male');
    this.registeredFemaleList = this.registeredUserList.filter((usr:any) => usr.gender=='Female');
  }
  onVote(){
    console.log(this.voteForm.value);
    if(!this.voteForm.value.femaleChoice){
      this.femaleChoiceErr = true;
    }
    if(!this.voteForm.value.maleChoice){
      this.maleChoiceErr = true;
    }
    if(!!this.voteForm.value.maleChoice && !!this.voteForm.value.femaleChoice){
      this.userAuthService.callVote({"employeeId": this.loggedInUserDetails.employeeId, "maleChoice": this.voteForm.value.maleChoice, "femaleChoice": this.voteForm.value.femaleChoice}).subscribe({
        next: (res: any) => {
          console.log(res);
          this.router.navigateByUrl('ack');
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
    /*if(!!this.voteForm.value.maleChoice && !!this.voteForm.value.femaleChoice){
      if(!this.loggedInUserDetails.hasVoted){
        this.registeredUserList.forEach(u => {
          if(u.employeeId==this.voteForm.value.maleChoice){
            u.gotVotes.push(this.loggedInUser);
          }
          if(u.employeeId==this.voteForm.value.femaleChoice){
            u.gotVotes.push(this.loggedInUser);
          }
          if(u.employeeId==this.loggedInUser){
            u.hasVoted = true;
          }
        });
        this.userAuthService.setRegisteredUsersList(this.registeredUserList);
        console.log(this.registeredUserList);
        this.router.navigateByUrl('ack');
      }
      else{
        this.registeredUserList.forEach(r => {
          if(r.gotVotes.includes(this.loggedInUser)){
            r.gotVotes.splice(r.gotVotes.indexOf(this.loggedInUser), 1);
          }          
        });
        this.registeredUserList.forEach(p => {
          if(p.employeeId==this.voteForm.value.maleChoice){
            p.gotVotes.push(this.loggedInUser);
          }
          if(p.employeeId==this.voteForm.value.femaleChoice){
            p.gotVotes.push(this.loggedInUser);
          }
        });
        this.userAuthService.setRegisteredUsersList(this.registeredUserList);
        console.log(this.registeredUserList);
        this.router.navigateByUrl('ack');
      }
    }*/
  }
}
