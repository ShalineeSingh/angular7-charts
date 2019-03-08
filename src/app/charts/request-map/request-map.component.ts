import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.services';

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
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
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
