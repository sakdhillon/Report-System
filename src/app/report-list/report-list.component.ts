import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as Model from "../report-class";
import rep = Model.report; 
import { ReportsService } from '../reports.service';

import { HttpClient } from '@angular/common/http'; 
import { MapLabelsService } from '../map-labels.service';
import { AddReportComponent } from '../add-report/add-report.component';
import { MapsComponent } from '../maps/maps.component';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  reports:rep[];
  query:string;

  constructor(private rs: ReportsService, private http: HttpClient){
    this.query = ''
    this.reports = []    
  }
  ngOnInit(): void {


    this.http.get(`https://272.selfip.net/apps/9J0OxNFbmy/collections/data/documents/`).subscribe((response:any) =>{
        var list: rep [] = response.map((response: any) => {
          return new rep (
            response.data.criminalName, 
            response.data.location, 
            response.data.status, 
            response.data.extraInfo, 
            response.data.witnessName, 
            response.data.witnessNumber, 
            response.data.cid,
            response.data.lat,
            response.data.long
          );
      });
      
      this.rs.setter(list)
      this.reports = this.rs.get();

    });

  }


  onReportDelete(evt:{report_cid:number}){
    let del = evt.report_cid;
    this.reports = this.rs.delete(del);
    console.log('deletinggggg reporrrttttttt')
  }

}

