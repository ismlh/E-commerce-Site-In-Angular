import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  getUserLogged: BehaviorSubject<boolean>;
  constructor() {
    this.getUserLogged = new BehaviorSubject<boolean>(false);
  }

  login() {
    localStorage.setItem('Token', 'jdhsljfnkvfl455kgg');
    this.getUserLogged.next(true);
  }
  logout() {
    localStorage.removeItem('Token');
    this.getUserLogged.next(false);
  }
  getUserLoggedIn() {
    return localStorage.getItem('Token') ? true : false;
  }
}
