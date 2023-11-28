import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private routeSubject: Subject<string> = new Subject<string>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  updateSideBarRoute() {
    const url = this.router.routerState.snapshot.url
    this.routeSubject.next(url)
  }

  getRouteSubject() {
    return this.routeSubject
  }
}
