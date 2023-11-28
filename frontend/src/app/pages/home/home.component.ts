import { Component } from '@angular/core';
import { RouteService } from 'src/app/service/route.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private routeService: RouteService) {}

  ngOnInit() {
    this.routeService.updateSideBarRoute()
  }
}
