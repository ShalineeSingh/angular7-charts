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
  to_date: Date = new Date();
  from_date: Date = new Date();
  to_time: Date = new Date(new Date().setHours(new Date().getHours() - 1));
  from_time: Date = new Date();
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
    let to_date_time: number = this.to_date.setHours(this.to_time.getHours(), this.to_time.getMinutes());
    let from_date_time = this.from_date.setHours(this.from_time.getHours(), this.from_time.getMinutes());
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['/details/workflow', { 'to_time': to_date_time, 'from_time': from_date_time }]);
  }
}
