import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.services';

@Component({
  selector: 'app-request-map',
  templateUrl: './request-map.component.html',
  styleUrls: ['./request-map.component.scss'],
  providers: [AppService]
})
export class RequestMapComponent implements OnInit {
  single: any[];
  loader: boolean = true;
  request_map: any;
  view: any[] = [1100, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Days';
  showYAxisLabel = true;
  yAxisLabel = 'Microservices';

  colorScheme = {
    domain: ['#d9534f', '#eea236', '#4cae4c']
  };
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getRequestMap();
  }
  getRequestMap() {
    this.loader = true;
    this.appService.getRequestMapService().subscribe((response: any) => {
      this.loader = false;
      this.request_map = response.data;
      console.log(this.request_map);
    })
  }
  onSelect(event) {
    console.log(event);
  }
}
