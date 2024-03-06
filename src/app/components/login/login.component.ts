import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  status! : boolean 

  email!: string
  password! : string

  constructor(
    private _authService : AuthService,
    private router : Router){
    _authService.isTokenExistSub.subscribe({
      next : (value : boolean) => this.status = value
    })
    _authService.emitTokenExist()
  }

  login() {
    this._authService.login(this.email, this.password)
    this.email=''
    this.password=''
  }
  

  logout(){
    this._authService.logout();
    this.email=''
    this.password=''
  }



}

