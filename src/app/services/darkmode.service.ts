import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private isDarkMode: boolean = false;

  constructor() { }

  enableDarkMode(): void {
    this.isDarkMode = true;
    // Ajouter des manipulations CSS ou autres pour activer le mode sombre
    document.body.classList.add('dark-mode'); // Ajoute une classe pour le mode sombre
    // document.querySelector('html')?.setAttribute('data-theme','dark');  //normalement c'est sur la balise HTML...
    console.log("darkmode ON");
    
  }

  disableDarkMode(): void {
    this.isDarkMode = false;
    // Ajouter des manipulations CSS ou autres pour désactiver le mode sombre
    document.body.classList.remove('dark-mode'); // Supprime la classe pour le mode sombre
    // document.querySelector('html')?.removeAttribute('data-theme');  //normalement c'est sur la balise HTML...
    console.log("darkmode OFF");
  }

  isDarkModeEnabled(): boolean {
    return this.isDarkMode;
  }
}
