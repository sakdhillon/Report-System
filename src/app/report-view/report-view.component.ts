import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportsService } from '../reports.service';

import { HttpClient } from '@angular/common/http';

import * as Model from "../report-class";
import rep = Model.report; 
import { windowCount } from 'rxjs';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent {

  r!:rep;
  validate:boolean;
  dataLoaded:boolean
  wrong: boolean;

  rId: number = this.ActivatedRoute.snapshot.params['id']
  constructor(private rs: ReportsService, private ActivatedRoute: ActivatedRoute, private router: Router, private http: HttpClient){
    this.validate = false
    this.dataLoaded = false
    this.wrong = false
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
    // this.reports = this.rs.get();
    this.r = this.rs.getReportById(this.rId);
    console.log(this.r.cid);
    this.dataLoaded = true;
    



    });
  }


  onClose(){
    this.router.navigate(["/reports"])
  }

  onEdit(evt:any, cid:number){
    this.router.navigate(["/reports",cid,"edit"])
  }

  val(){
    this.validate = true
  }

  hashPassword(evt:any, report_cid:number): void {
    const password = document.getElementById('pass') as HTMLInputElement
    console.log("password",password.value);

    this.http.get(`https://api.hashify.net/hash/md5/hex?value=${password.value}`).subscribe(
      (response:any) => {
        const hashPassword = response.Digest;
        if (hashPassword == 'fcab0453879a2b2281bc5073e3f5fe54'){
          this.onEdit (evt, report_cid);
        }else{
          this.incorrect()
        }
      }
    )
  }

  onView(evt:any, cid:number){
    this.router.navigate(["/reports",cid])
  }
  
  incorrect(){
    this.wrong = true;
    setTimeout(() => {
      this.wrong = false;
    }, 1500); 
  }
}
