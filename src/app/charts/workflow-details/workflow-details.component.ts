import {
  Component, OnInit
} from '@angular/core';

import * as shape from 'd3-shape';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AppService } from '../../services/app.services';

@Component({
  selector: 'app-workflow-details',
  templateUrl: './workflow-details.component.html',
  styleUrls: ['./workflow-details.component.scss'],
  providers: [AppService]
})
export class WorkflowDetailsComponent implements OnInit {

  hierarchialGraph: any;
  error_logs: any;
  loader: boolean = true;
  curve = shape.curveBundle.beta(1);
  view: any[] = [700, 400];
  // curve = shape.curveLinear;
  chart_width = 1200;
  chart_height = 300;

  constructor(private appService: AppService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    // console.log(this.chart_container);
    // this.chart_width = this.chartContainer.nativeElement.offsetWidth;
    this.view = [this.chart_width, this.chart_height];
    this.getWorkflowList();
  }
  getWorkflowList() {
    this.loader = true;
    this.appService.getWorkflowDetails().subscribe((response: any) => {
      this.loader = false;
      this.hierarchialGraph = response.data;
      console.log(this.hierarchialGraph);
    })
  }
  getErrorLogs(event: any) {
    this.appService.getErrorLogsService().subscribe((response: any) => {
      this.error_logs = response.data;
      console.log(this.error_logs);
    })
  }
  onSelect(event) {
    this.getErrorLogs(event);
  }
}
