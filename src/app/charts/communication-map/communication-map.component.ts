import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.services';

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
  hierarchialGraph = { nodes: [], links: [] }
  curve = shape.curveBundle.beta(1);
  // curve = shape.curveLinear;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getCommunicationMap();
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
