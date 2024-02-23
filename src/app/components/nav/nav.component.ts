import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  constructor(private router: Router){
  
  
  }
  
  navToGuitaristes() {
    this.router.navigate(['/guitaristes']); // Naviguez vers la route 'guitaristlist'
  }
  
  navToHome(){
    this.router.navigate(['/home']); // Naviguez vers la route 'guitaristlist'
  }
}
