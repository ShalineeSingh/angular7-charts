import { Component, OnInit } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as shape from 'd3-shape';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AppService } from '../../services/app.services';
@Component({
  selector: 'app-workflow-usage',
  templateUrl: './workflow-usage.component.html',
  styleUrls: ['./workflow-usage.component.scss'],
  providers: [AppService]
})
export class WorkflowUsageComponent implements OnInit {

  loader: boolean = true;
  no_data_found: boolean = false;
  interval: number = 4000;
  to_time_param: number;
  from_time_param: number;
  autoScale: boolean = true;
  view: any[] = [1300, 300];
  showLegend = true;
  workflow_id_param: any;
  workflow_name: string;
  query_params: any = {};
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  workflow_usage_data: any;
  to_time: number = new Date().setHours(new Date().getHours() - 1);
  from_time: number = +new Date();

  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.to_time_param = +this.route.snapshot.queryParams['to_time'];
    this.from_time_param = +this.route.snapshot.queryParams['from_time'];
    this.workflow_id_param = this.route.snapshot.queryParams['workflow_id'];
    this.workflow_name = this.route.snapshot.queryParams['name'];
  }
  ngAfterViewInit() {
    this.query_params = {
      'startTime': this.from_time_param ? this.from_time_param : this.to_time,
      'endTime': this.to_time_param ? this.to_time_param : this.from_time,
      'workflow': this.workflow_name ? this.workflow_name : 'user'
    }
    this.getWorkflowUsage();
    interval(this.interval)
      .pipe(
        flatMap(() => this.appService.getWorkflowUsageDetails(this.query_params))
      )
      .subscribe((response: any) => {
        if (response.length > 0) {
          this.workflow_usage_data = response;
        } else {
          this.no_data_found = true;
        }
        this.loader = false;
      })
  }
  getWorkflowUsage() {
    this.loader = true;
    this.appService.getWorkflowUsageDetails(this.query_params).subscribe((response: any) => {
      if (response) {
        this.workflow_usage_data = response;
      } else {
        this.no_data_found = true;
      }
      this.loader = false;
    })
  };

  onSelect(event) {
    console.log(event);
  }

}
