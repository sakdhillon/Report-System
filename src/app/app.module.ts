import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { AddReportComponent } from './add-report/add-report.component';
import { RoutingModule } from './routing.module';
import { ReportListComponent } from './report-list/report-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
import { ReportViewComponent } from './report-view/report-view.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { MapsComponent } from './maps/maps.component';
import { LocationsComponent } from './locations/locations.component';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 


@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    AddReportComponent,
    ReportListComponent,
    ReportViewComponent,
    EditReportComponent,
    MapsComponent,
    LocationsComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
