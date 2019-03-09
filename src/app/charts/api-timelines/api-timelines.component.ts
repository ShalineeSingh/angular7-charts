import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.services';
@Component({
  selector: 'app-api-timelines',
  templateUrl: './api-timelines.component.html',
  styleUrls: ['./api-timelines.component.scss'],
  providers: [AppService]
})
export class ApiTimelinesComponent implements OnInit {
  loader: boolean = true;
  timeline_graph: any;
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

  // line, area
  autoScale = true;


  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getTimelineDetails();
  }
  getTimelineDetails() {
    this.loader = true;
    this.appService.getTimelineDetailsService().subscribe((response: any) => {
      this.loader = false;
      this.timeline_graph = response.data;
      console.log(this.timeline_graph);
    })
  }
  onSelect(event) {
    console.log(event);
  }

}
