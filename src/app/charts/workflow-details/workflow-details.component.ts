import { Component, OnInit } from '@angular/core';

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
  name = 'Angular 5';
  hierarchialGraph: any;
  loader: boolean = true;
  curve = shape.curveBundle.beta(1);
  // curve = shape.curveLinear;

  constructor(private appService: AppService) { }

  ngOnInit() {
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
  onSelect(event) {
    console.log(event);
  }
}
