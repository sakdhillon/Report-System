import { Injectable, OnInit } from '@angular/core';

import * as Model from "./report-class";
import rep = Model.report; 

import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  reports:rep[]
  constructor(private http: HttpClient) { 
    // this.reports = []
    // call to the backend database

    this.reports = []
  
  }


  // data we allow on the data 

  get(){
    return this.reports;
  }

  getReportById(id: number): any{
    for (let i = 0; i < this.reports.length; i++){
      if (this.reports[i].cid == id){
        return this.reports[i]
      }
    }
  }

  edit (id: number, newReport:rep) {
    for (let i = 0; i < this.reports.length; i++){
      if (this.reports[i].cid == id){
        newReport.cid = id
        this.reports[i] = newReport
      }
    }
  }
  
  add (newReport: rep){
    let i = this.reports.length;
    console.log(i)
    if (i === 0) {
      newReport.cid = 1
    }else{
      console.log("hereeee")
      let id = this.reports[i-1].cid + 1
      newReport.cid = id
    }
    newReport.time = new Date().getTime();
    this.reports.push(newReport);
  }

  setter(reports: rep[]){
    this.reports = reports
    console.log(reports)
  }


  delete(id:number){
    let del = id
    this.reports = this.reports.filter((r:any) =>{
      return r.cid != del
    })
    console.log('deletinggggg reporrrttttttt place 2')
    return this.reports
  }


}


