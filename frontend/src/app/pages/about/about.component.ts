import { Component } from '@angular/core';
import { RouteService } from 'src/app/service/route.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private routeService: RouteService) {}

  ngOnInit() {
    this.routeService.updateSideBarRoute()
  }
}
