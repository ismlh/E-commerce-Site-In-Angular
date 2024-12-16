import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { Iuser } from '../../Models/iuser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  isLogged!: boolean;
  constructor(private _authSer: AuthServiceService) {}
  ngOnInit(): void {
    this._authSer.getUserLogged.subscribe((data) => {
      this.isLogged = data;
    });
    this.isLogged = this._authSer.getUserLoggedIn();
  }
  login() {
    this._authSer.login();
    this._authSer.getUserLogged.subscribe((data) => {
      this.isLogged = data;
    });
  }

  logout() {
    this._authSer.logout();
    this._authSer.getUserLogged.subscribe((data) => {
      this.isLogged = data;
    });
  }
}
