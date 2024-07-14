import { Component, OnInit, inject } from '@angular/core';
import { UserAuthServiceService } from '../../services/user-auth-service.service';
import { User } from '../../services/registeredUsersListSample';

@Component({
  selector: 'app-result-page-component',
  standalone: true,
  imports: [],
  templateUrl: './result-page-component.component.html',
  styleUrl: './result-page-component.component.css'
})
export class ResultPageComponentComponent implements OnInit {
  bestDressedMale = 'BestDressedMale';
  bestDressedFemale = 'BestDressedFemale';
  registeredUserIdList : String[] | undefined = [];
  registeredUserList : User[] = [];
  registeredMaleList : any = {};
  registeredFemaleList : any = {};
  userAuthService = inject(UserAuthServiceService);
  ngOnInit(): void {
    this.registeredUserIdList = this.userAuthService.getRegisteredUsersIdList();
    this.registeredUserList = this.userAuthService.getRegisteredUsersList();
    this.registeredMaleList = this.registeredUserList.filter((usr:any) => usr.gender=='Male');
    this.registeredFemaleList = this.registeredUserList.filter((usr:any) => usr.gender=='Female');
    console.log(this.registeredMaleList);
    console.log(this.registeredFemaleList);
    let regMaleSort = this.registeredMaleList.sort(function(a : any, b : any){
      if(a.gotVotes.length > b.gotVotes.length){ return 1; }
      if(a.gotVotes.length < b.gotVotes.length){ return -1; }
      return 0;
    });
    console.log(regMaleSort);
    this.bestDressedMale = regMaleSort.at(-1).name || regMaleSort[regMaleSort.length - 1].name;
    let regFemaleSort = this.registeredFemaleList.sort(function(c : any, d : any){
      if(c.gotVotes.length > d.gotVotes.length){ return 1; }
      if(c.gotVotes.length < d.gotVotes.length){ return -1; }
      return 0;
    });
    console.log(regFemaleSort);
    this.bestDressedFemale = regFemaleSort.at(-1).name || regFemaleSort[regFemaleSort.length - 1].name;
    if(regMaleSort[regMaleSort.length - 1].gotVotes.length==0){
      this.bestDressedMale = 'BestDressedMale';
    }
    if(regFemaleSort[regFemaleSort.length - 1].gotVotes.length==0){
      this.bestDressedFemale = 'BestDressedFemale';
    }
  }
}
