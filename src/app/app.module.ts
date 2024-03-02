import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { GuitaristesComponent } from './components/guitaristes/guitaristes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuitaresComponent } from './components/guitares/guitares.component';
import { AccessoiresComponent } from './components/accessoires/accessoires.component';
import { GroupesComponent } from './components/groupes/groupes.component';
import localeFrBe from '@angular/common/locales/fr-BE';
import { registerLocaleData } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';


registerLocaleData(localeFrBe);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    GuitaristesComponent,
    GuitaresComponent,
    AccessoiresComponent,
    GroupesComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-BE" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
