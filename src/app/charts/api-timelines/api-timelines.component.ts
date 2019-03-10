import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.services';
import { flatMap } from 'rxjs/operators';
import { interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-api-timelines',
  templateUrl: './api-timelines.component.html',
  styleUrls: ['./api-timelines.component.scss'],
  providers: [AppService]
})
export class ApiTimelinesComponent implements OnInit {
  loader: boolean = true;
  timeline_graph: any;
  no_data_found: boolean = false;
  interval: number = 4000;
  to_time_param: number;
  from_time_param: number;
  autoScale: boolean = true;
  view: any[] = [1300, 300];
  workflow_id_param: any;
  showLegend = true;
  query_params: any = {};
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  workflow_name: string;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  to_time: number = new Date().setHours(new Date().getHours() - 1);
  from_time: number = +new Date();

  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.to_time_param = +this.route.snapshot.paramMap.get('to_time');
    this.from_time_param = +this.route.snapshot.paramMap.get('from_time');
    this.workflow_id_param = this.route.snapshot.paramMap.get('workflow_id');
    this.workflow_name = this.route.snapshot.paramMap.get('name');
  }
  ngAfterViewInit() {
    this.getTimelineDetails();
    this.query_params = {
      'startTime': this.from_time_param ? this.from_time_param : this.to_time,
      'endTime': this.to_time_param ? this.to_time_param : this.from_time,
      'workflow': this.workflow_id_param ? this.workflow_id_param : 'user'
    }
    interval(this.interval)
      .pipe(
        flatMap(() => this.appService.getTimelineDetailsService(this.query_params))
      )
      .subscribe((response: any) => {
        if (response) {
          this.timeline_graph = response.data;
        } else {
          this.no_data_found = true;
        }
        this.loader = false;
      })
  }

  getTimelineDetails() {
    this.loader = true;
    this.appService.getTimelineDetailsService(this.query_params).subscribe((response: any) => {
      this.loader = false;
      this.timeline_graph = response.data;
      console.log(this.timeline_graph);
    })
  }
  onSelect(event) {
    console.log(event);
  }

}
