import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DarkModeService } from '../../services/darkmode.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  darkMode!:boolean
  //variable de verification pour la sidebar
  isSidebarCollapsed: boolean = true;
  isSmallScreen: boolean = false;
  status!:boolean

  constructor(private router: Router,
    private _authService : AuthService,
    private darkModeService: DarkModeService) {
    // Vérifier la taille de l'écran au chargement de la page
    this.checkScreenSize();

    _authService.isTokenExistSub.subscribe({
      next : (value : boolean) => this.status = value
    })
    _authService.emitTokenExist()
  }



  //darkmode

  toggleDarkMode() {
    if (this.darkModeService.isDarkModeEnabled()) {
      this.darkModeService.disableDarkMode();
      this.darkMode=false
  
    } else {
      this.darkModeService.enableDarkMode();
      this.darkMode=true

    }
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
  
logout(){
  this._authService.logout();
}
}
