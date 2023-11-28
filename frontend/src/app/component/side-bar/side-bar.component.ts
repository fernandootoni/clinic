import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { RouteService } from 'src/app/service/route.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  private routeSubscription: Subscription | undefined;

  authenticated: boolean = false;
  actualPage: string = ''

  token: string = localStorage.getItem('Token') || ''
  userID = localStorage.getItem('ID') || ''
  accessLevel: number = parseInt(localStorage.getItem('AccessLevel')!) || 0

  constructor(private routeService: RouteService) { }

  ngOnInit() {
    this.authenticated = !!this.token

    this.routeSubscription = this.routeService.getRouteSubject().subscribe(route => {
      this.actualPage = route.split("/")[1]
      if(!this.actualPage) {
        this.actualPage = 'home'
      } else if(route.split("/")[2] === 'dashboard') {
        this.actualPage = 'dashboard'
      }
    })
  }
}