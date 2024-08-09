import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthServiceService } from '../../services/user-auth-service.service';
import { User } from '../../services/registeredUsersListSample';

@Component({
  selector: 'app-acknowlegement-page-component',
  standalone: true,
  imports: [],
  templateUrl: './acknowlegement-page-component.component.html',
  styleUrl: './acknowlegement-page-component.component.css'
})
export class AcknowlegementPageComponentComponent implements OnInit {
  router = inject(Router);
  userAuthService = inject(UserAuthServiceService)
  canViewResults = false;
  constructor(){
    this.userAuthService.canViewResults.subscribe(val => this.canViewResults = val);
  }
  viewResults(){
    this.router.navigateByUrl('results');
  }
  ngOnInit(): void {
    console.log('Acknowledgement Screen');
  }
}
