import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  authenticated: boolean = false
  token: string = localStorage.getItem('Token') || ''
  username: string = localStorage.getItem('Name')! || ''
  accessLevel: number = parseInt(localStorage.getItem('AccessLevel')!) || 0

  constructor(private router: Router) {}

  ngOnInit() {
    if(this.token)
      this.authenticated = true
        else 
          this.authenticated = false
  }

  logout() {
    localStorage.removeItem('Token')
    localStorage.removeItem('Name')
    localStorage.removeItem('AccessLevel')
    localStorage.removeItem('ID')

    window.location.href = '/';
  }
}
