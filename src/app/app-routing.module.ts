import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsComponent } from './charts/charts.component';
import { WorkflowDetailsComponent } from './charts/workflow-details/workflow-details.component';
import { ApiTimelinesComponent } from './charts/api-timelines/api-timelines.component';
import { RequestMapComponent } from './request-map/request-map.component';
import { CommunicationMapComponent } from './charts/communication-map/communication-map.component';
import { TimeFilterComponent } from './time-filter/time-filter.component';
import { WorkflowUsageComponent } from './charts/workflow-usage/workflow-usage.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'home', component: DashboardComponent, data: {
      breadcrumb: ''
    }
  },
  {
    path: 'details', component: ChartsComponent,
    children: [
      {
        path: 'workflow', component: WorkflowDetailsComponent, data: {
          breadcrumb: 'Workflow'
        }
      },
      // {
      //   path: 'timeline', component: ApiTimelinesComponent, data: {
      //     breadcrumb: 'ApiTimelinesComponent'
      //   }
      // },
      // {
      //   path: 'request', component: RequestMapComponent, data: {
      //     breadcrumb: 'RequestMapComponent'
      //   }
      // },
      {
        path: 'usage', component: WorkflowUsageComponent, data: {
          breadcrumb: 'WorkflowUsageComponent'
        }
      },
      // {
      //   path: 'map', component: CommunicationMapComponent, data: {
      //     breadcrumb: 'CommunicationMapComponent'
      //   }
      // }
    ]
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [
  DashboardComponent,
  ChartsComponent,
  WorkflowDetailsComponent,
  ApiTimelinesComponent,
  RequestMapComponent,
  CommunicationMapComponent,
  TimeFilterComponent,
  WorkflowUsageComponent
];
