import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GuitaristesComponent } from './components/guitaristes/guitaristes.component';

const routes: Routes = [
  {path : "", redirectTo : "home", pathMatch : "full"},
  {path : "home", component : HomeComponent},
  {path : "guitaristes", component : GuitaristesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
