import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-component',
  standalone: true,
  imports: [],
  templateUrl: './home-page-component.component.html',
  styleUrl: './home-page-component.component.css'
})
export class HomePageComponentComponent {
  slideId = 1;
  router = inject(Router);
  toSlideTwo(){
    this.slideId = 2;
  }
  toSlideThree(){
    this.slideId = 3;
  }
  goToLogin(){
    this.router.navigateByUrl('/login');
  }
}