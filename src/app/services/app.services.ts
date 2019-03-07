import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AppService {
  constructor(private httpClient: HttpClient) { }
  getDashboardData(query_params?: any, params?: any) {
    return this.httpClient.get('./assets/mock-data/dashboard.json');
  }

}