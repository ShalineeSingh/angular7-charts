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

  hierarchialGraph: any = {};
  error_logs: any;
  loader: boolean = true;
  no_data_found: boolean = false;
  show_legend: boolean = false;
  autoScale: boolean = true;
  curve = shape.curveBundle.beta(1);
  view: any[] = [1300, 300];
  // curve = shape.curveLinear;

  constructor(private appService: AppService) { }
  to_time: Date = new Date(new Date().setHours(new Date().getHours() - 1));
  from_time: Date = new Date();
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getWorkflowList();
  }
  getWorkflowList() {
    this.loader = true;
    let query_params = {
      'startTime': +this.to_time,
      'endTime': +this.from_time,
      'workflow': 'user'
    }
    this.appService.getWorkflowDetails(query_params).subscribe((response: any) => {
      if (response) {
        this.createDataForGraph(response);
        console.log(this.hierarchialGraph);
      } else {
        this.no_data_found = true;
      }
      this.loader = false;
    })
  }
  createDataForGraph(response: any) {
    let temp_nodes = [];
    let temp_links = [];
    let nodes = [];

    let api_keys = Object.keys(response);
    if (api_keys.length > 0) {
      temp_nodes = temp_nodes.concat(response[api_keys[0]].nodeInfoModels);
      temp_links = temp_links.concat(response[api_keys[0]].nodeLinks);
    }
    if (temp_nodes.length > 0) {
      let flags = {};

      let node_ids = temp_nodes.filter(function (entry) {
        if (flags[entry.spanId]) {
          return false;
        }
        flags[entry.spanId] = true;
        return true;
      });
      for (var i = 0; i < node_ids.length; i++) {
        let exceptions = [];
        temp_nodes.forEach((node) => {
          if (node.spanId === node_ids[i].spanId) {
            if (node.exception) {
              exceptions.push(node.exception);
            }
          };
        });
        nodes.push({
          'id': temp_nodes[i].spanId,
          'exception': exceptions,
          'fail': exceptions.length,
          'total': api_keys.length,
          'label': exceptions.length + '/' + api_keys.length,

          'color': this._getColor(exceptions.length, api_keys.length)

        });
      }
    }
    if (temp_links.length > 0) {
      for (var i = 0; i < temp_links.length; i++) {
        temp_links[i].target = temp_links[i].spanId;
        delete temp_links[i].spanId;
        temp_links[i].source = temp_links[i].parentSpanId;
        delete temp_links[i].parentSpanId;
      }

    }
    console.log(nodes);
    // console.log(temp_links);
    this.hierarchialGraph.links = temp_links;
    this.hierarchialGraph.nodes = nodes;

  }
  getErrorLogs(id: any) {
    let item = this.hierarchialGraph.nodes.find(i => i.id === id);
    console.log(item);
    this.error_logs = item;

  }
  onSelect(event) {
    console.log(event);
    this.getErrorLogs(event.id);
  }
  _getColor(currentValue, maxValue) {
    let percent = 100 - (currentValue / maxValue) * 100;
    let r = percent < 50 ? 255 : Math.floor(255 - (percent * 2 - 100) * 255 / 100);
    let g = percent > 50 ? 255 : Math.floor((percent * 2) * 255 / 100);
    return 'rgb(' + r + ',' + g + ',0)';
  }
}

