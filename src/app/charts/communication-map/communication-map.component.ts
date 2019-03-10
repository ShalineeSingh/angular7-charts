import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.services';
import { flatMap } from 'rxjs/operators';
import { interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as shape from 'd3-shape';
import { NgxGraphModule } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-communication-map',
  templateUrl: './communication-map.component.html',
  styleUrls: ['./communication-map.component.scss'],
  providers: [AppService]
})
export class CommunicationMapComponent implements OnInit {

  loader: boolean = true;
  no_data_found: boolean = false;
  interval: number = 4000;
  to_time_param: number;
  from_time_param: number;
  autoScale: boolean = true;
  view: any[] = [1300, 300];
  workflow_id_param: any;
  showLegend = true;
  workflow_name: string;
  hierarchialGraph = { nodes: [], links: [] }
  curve = shape.curveBundle.beta(1);
  // curve = shape.curveLinear;

  constructor(private appService: AppService, private route: ActivatedRoute) { }
  to_time: number = new Date().setHours(new Date().getHours() - 1);
  from_time: number = +new Date();
  ngOnInit() {
    this.to_time_param = +this.route.snapshot.paramMap.get('to_time');
    this.from_time_param = +this.route.snapshot.paramMap.get('from_time');
    this.workflow_id_param = this.route.snapshot.paramMap.get('workflow_id');
    this.workflow_name = this.route.snapshot.paramMap.get('name');
  }
  ngAfterViewInit() {
    this.getCommunicationMap();
    let query_params = {
      'startTime': this.from_time_param ? this.from_time_param : this.to_time,
      'endTime': this.to_time_param ? this.to_time_param : this.from_time,
      'workflow': this.workflow_id_param ? this.workflow_id_param : 'user'
    }
    interval(this.interval)
      .pipe(
        flatMap(() => this.appService.getCommunicationMapService(query_params))
      )
      .subscribe((response: any) => {
        if (Object.keys(response).length > 0) {
          this.hierarchialGraph = response.data;
          console.log(this.hierarchialGraph);
        } else {
          this.no_data_found = true;
        }
        this.loader = false;
      })
  }

  getCommunicationMap() {
    this.loader = true;
    this.appService.getCommunicationMapService().subscribe((response: any) => {
      this.loader = false;
      this.hierarchialGraph = response.data;
      console.log(this.hierarchialGraph);
    })
  }

}
