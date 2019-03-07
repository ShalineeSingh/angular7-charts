import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../services/app.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [AppService]
})
export class DashboardComponent implements OnInit {
  public workflow_list: any;
  current: number = 0;
  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.getWorkflowList();
  }
  getWorkflowList() {
    this.appService.getDashboardData().subscribe((data) => {
      this.workflow_list = data;
      console.log(data);
    })
  }

  toggleAccordion(index: number) {
    this.current = this.current !== index ? index : -1;
  }
  goToDetails(event: Event, workflow: string) {
    event.preventDefault();
    event.stopPropagation();
    console.log(workflow);
    this.router.navigate(['/details', { 'workflow': workflow }]);
  }
}
