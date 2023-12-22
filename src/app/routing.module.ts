import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { ReportListComponent } from './report-list/report-list.component';
import { AddReportComponent } from './add-report/add-report.component';
import { ReportViewComponent } from './report-view/report-view.component';
import { EditReportComponent } from './edit-report/edit-report.component';

const appRoutes:Routes = [
  { path: 'reports', component: ReportListComponent},
  { path: 'reports/add', component: AddReportComponent},
  { path: 'reports/:id', component: ReportViewComponent},
  { path: 'reports/:id/edit', component: EditReportComponent},
  { path: '', redirectTo: '/reports', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
