import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AppService {
  constructor(private httpClient: HttpClient) { }
  getDashboardData(query_params?: any, params?: any) {
    return this.httpClient.get('./assets/mock-data/dashboard.json');
  }
  getWorkflowDetails(query_params?: any, params?: any) {
    return this.httpClient.get('./assets/mock-data/workflow-details.json');
  }
  getTimelineDetailsService(query_params?: any, params?: any) {
    return this.httpClient.get('./assets/mock-data/timeline-details.json');
  }
  getRequestMapService(query_params?: any, params?: any) {
    return this.httpClient.get('./assets/mock-data/request-heat-map.json');
  }
  getCommunicationMapService(query_params?: any, params?: any) {
    return this.httpClient.get('./assets/mock-data/communication-map.json');
  }
  getErrorLogsService(query_params?: any, params?: any) {
    return this.httpClient.get('./assets/mock-data/error-log.json');
  }
}