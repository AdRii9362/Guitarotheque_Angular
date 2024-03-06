import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GuitaristesComponent } from './components/guitaristes/guitaristes.component';
import { GuitaresComponent } from './components/guitares/guitares.component';
import { AccessoiresComponent } from './components/accessoires/accessoires.component';
import { GroupesComponent } from './components/groupes/groupes.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path : "", redirectTo : "home", pathMatch : "full"},
  {path : "home", component : HomeComponent},
  {path : "guitares", component : GuitaresComponent},
  {path : "accessoires", component : AccessoiresComponent},
  {path : "guitaristes", component : GuitaristesComponent},
  {path : "groupes", component : GroupesComponent},
  {path : "secretadminaccess", component:LoginComponent}
  // {path : "secretadminaccess", canActivate:[authGuard], component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
