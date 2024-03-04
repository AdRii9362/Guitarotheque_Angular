import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  //variable de verification pour la sidebar
  isSidebarCollapsed: boolean = true;
  isSmallScreen: boolean = false;

  constructor(private router: Router) {
    // Vérifier la taille de l'écran au chargement de la page
    this.checkScreenSize();
  }

  // #region "SideBar"
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Mettre à jour la valeur de isSmallScreen lors du redimensionnement de la fenêtre
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const thresholdWidth = 995; // Seuil de la largeur de l'écran pour basculer en mode plein écran
  
    const windowWidth = window.innerWidth;
    const isSidebarOpen = !this.isSidebarCollapsed; // Vérifier si la barre latérale est actuellement ouverte
  
    // Si la barre latérale est actuellement ouverte et que la largeur de l'écran dépasse le seuil, la conserver ouverte
    if (isSidebarOpen && windowWidth >= thresholdWidth) {
      this.isSmallScreen = false;
    } else {
      // Sinon, déterminer si l'écran est petit en fonction de la largeur de la fenêtre
      this.isSmallScreen = windowWidth < thresholdWidth;
    }
  
    // Afficher ou masquer la barre latérale en fonction de la taille de l'écran
    if (!this.isSmallScreen) {
      this.isSidebarCollapsed = false; // Toujours afficher la barre latérale sur les grands écrans
    }
  }
  

  toggleSidebar() {
    if (this.isSmallScreen) {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }
// #endregion
  
}
