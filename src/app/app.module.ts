import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsComponent } from './charts/charts.component';
import { WorkflowDetailsComponent } from './charts/workflow-details/workflow-details.component';
import { ApiTimelinesComponent } from './charts/api-timelines/api-timelines.component';
import { RequestMapComponent } from './charts/request-map/request-map.component';
import { CommunicationMapComponent } from './charts/communication-map/communication-map.component';
import { TimeFilterComponent } from './time-filter/time-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartsComponent,
    WorkflowDetailsComponent,
    ApiTimelinesComponent,
    RequestMapComponent,
    CommunicationMapComponent,
    TimeFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
