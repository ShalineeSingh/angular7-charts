import {
  Component, OnInit
} from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { interval } from 'rxjs';
import * as shape from 'd3-shape';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { ActivatedRoute } from '@angular/router';
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
  to_time_param: number;
  from_time_param: number;
  workflow_id_param: any;
  interval: number = 4000;
  query_params: any = {};
  workflow_name: string;
  // curve = shape.curveLinear;
  colorScheme = {
    domain: ['#d9534f', '#eea236', '#4cae4c']
  };

  constructor(private appService: AppService, private route: ActivatedRoute) { }
  to_time: number = new Date().setHours(new Date().getHours() - 1);
  from_time: number = +new Date();
  ngOnInit() {
    this.to_time_param = +this.route.snapshot.queryParams['to_time'];
    this.from_time_param = +this.route.snapshot.queryParams['from_time'];
    this.workflow_id_param = this.route.snapshot.queryParams['workflow_id'];
    this.workflow_name = this.route.snapshot.queryParams['name'];
  }

  ngAfterViewInit() {

    this.query_params = {
      'startTime': '1352148429518', 'endTime': '1652268499534',
      // 'startTime': this.from_time_param ? this.from_time_param : this.to_time,
      // 'endTime': this.to_time_param ? this.to_time_param : this.from_time,
      'workflow': this.workflow_name ? this.workflow_name : 'user'
    }
    this.getWorkflowList();
    interval(this.interval)
      .pipe(
        flatMap(() => this.appService.getWorkflowDetails(this.query_params))
      )
      .subscribe((response: any) => {
        if (Object.keys(response).length > 0) {
          this.createDataForGraph(response);
        } else {
          this.no_data_found = true;
        }
        this.loader = false;
      })
  }
  getWorkflowList() {
    this.loader = true;

    this.loader = true;
    this.appService.getWorkflowDetails(this.query_params).subscribe((response: any) => {
      if (Object.keys(response).length > 0) {
        this.createDataForGraph(response);
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

      // let node_ids = temp_nodes.filter(function (entry) {
      //   if (flags[entry.spanId]) {
      //     return false;
      //   }
      //   flags[entry.spanId] = true;
      //   return true;
      // });
      // console.log(node_ids);
      console.log(temp_nodes);
      for (var i = 0; i < api_keys.length; i++) {
        let exceptions = [];
        response[api_keys[i]].nodeInfoModels.forEach((node, index) => {
          if (node.exception) {
            if (!temp_nodes[index].exception_array) {
              temp_nodes[index].exception_array = [{
                exception_id: node.spanId,
                timeStamp: node.timeStamp,
                exceptions: node.exception
              }]

            } else {
              temp_nodes[index].exception_array.push({
                exception_id: node.spanId,
                timeStamp: node.timeStamp,
                exceptions: node.exception
              });
            }
            console.log(node.timeStamp);
            temp_nodes[index].timeStamp = node.timeStamp;
          }
        });
        // console.log(node_ids[i].spanId);
        // temp_nodes.forEach((node) => {
        //   // console.log(node.spanId);
        //   if (node.spanId === node_ids[i].spanId) {
        //     // console.log(node);
        //     if (node.exception) {
        //       exceptions.push(node.exception);
        //     }
        //   };
        // });
        // nodes.push({
        //   'id': temp_nodes[i].spanId,
        //   'exception': exceptions,
        //   'fail': exceptions.length,
        //   'total': api_keys.length,
        //   'label': exceptions.length + '/' + api_keys.length,
        //   'color': this._getColor(exceptions.length, api_keys.length)
        // });     
      }
      for (var i = 0; i < temp_nodes.length; i++) {
        let len = temp_nodes[i].exception_array ? temp_nodes[i].exception_array.length : 0;
        let node1 = {
          'id': temp_nodes[i].spanId,
          'exception_array': temp_nodes[i].exception_array,
          'timeStamp': temp_nodes[i].timeStamp,
          'fail': len,
          'total': api_keys.length,
          'label': temp_nodes[i].methodName,
          'label2': temp_nodes[i].methodName,
          'color': this._getColor(len, api_keys.length)
        }
        temp_nodes[i] = node1;
      };
    }
    if (temp_links.length > 0) {
      for (var i = 0; i < temp_links.length; i++) {
        temp_links[i].target = temp_links[i].spanId;
        delete temp_links[i].spanId;
        temp_links[i].source = temp_links[i].parentSpanId;
        delete temp_links[i].parentSpanId;
      }

    }
    // console.log(nodes);
    // console.log(temp_links);
    this.hierarchialGraph.links = temp_links;
    this.hierarchialGraph.nodes = temp_nodes;

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

