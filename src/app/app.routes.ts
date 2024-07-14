import { Routes } from '@angular/router';
import { UserLoginComponent } from './screens/user-login/user-login.component';
import { UserRegisterComponent } from './screens/user-register/user-register.component';
import { UserVoteComponent } from './screens/user-vote/user-vote.component';
import { HomePageComponentComponent } from './screens/home-page-component/home-page-component.component';
import { ResultPageComponentComponent } from './screens/result-page-component/result-page-component.component';
import { AcknowlegementPageComponentComponent } from './screens/acknowlegement-page-component/acknowlegement-page-component.component';
import { authGuardGuard } from './auth-guard.guard';

export const routes: Routes = [
    { path: '', component: HomePageComponentComponent },
    { path: 'login', component: UserLoginComponent },
    { path: 'register', component: UserRegisterComponent },
    { path: 'vote', component: UserVoteComponent, canActivate: [authGuardGuard] },
    { path: 'results', component: ResultPageComponentComponent, canActivate: [authGuardGuard] },
    { path: 'ack', component: AcknowlegementPageComponentComponent, canActivate: [authGuardGuard] },
];
