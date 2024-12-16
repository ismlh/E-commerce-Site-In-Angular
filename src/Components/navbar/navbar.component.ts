import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router'; // Added RouterModule
import { AuthServiceService } from '../../Services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLogged!: boolean;
  constructor(private _authService: AuthServiceService) {}
  ngOnInit(): void {
    this._authService.getUserLogged.subscribe((data) => {
      this.isLogged = data;
    });
    this.isLogged = this._authService.getUserLoggedIn();
  }
  login() {
    // this._authService.login();
    // this._authService.getUserLogged.next(true);
  }
  logout() {
    this._authService.logout();
    this._authService.getUserLogged.next(false);
  }
}
