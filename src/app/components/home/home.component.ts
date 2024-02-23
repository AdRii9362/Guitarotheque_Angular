import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // Utilisez 'styleUrls' pour spécifier les styles CSS
})
export class HomeComponent {

  constructor(private router: Router) { } // Injectez le service Router

  navToGuitaristes() {
    this.router.navigate(['/guitaristes']); // Naviguez vers la route 'guitaristlist'
  }

  navToHome(){
    this.router.navigate(['/home']); // Naviguez vers la route 'guitaristlist'
  }

}

