import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { report } from '../report-class';
import { ReportsService } from '../reports.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent {

  rep:any

  status!:boolean

  form: FormGroup
  r:any
  id: number = this.ActivatedRoute.snapshot.params['id']

  constructor(private rs: ReportsService ,private router: Router, private ActivatedRoute: ActivatedRoute, private http: HttpClient){
    let formControllers = {
      status: new FormControl(),   
    }
    this.form = new FormGroup (formControllers)
  }

  ngOnInit(): void {
    this.r = this.rs.getReportById(this.id);
    console.log(this.r.cid);

    this.http.get(`https://272.selfip.net/apps/9J0OxNFbmy/collections/data/documents/`).subscribe((response:any) =>{
        var list: report [] = response.map((response: any) => {
          return new report (
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
      this.rep = this.rs.get();

    });
  }


  async onSubmit(status:any){
    console.log(status);
    const r = this.rs.getReportById(this.id);

    console.log(r);
    if (status.status == true){
      r.status = true
    } else{
      r.status = null
    }

    console.log(r)

    this.storagePut(r);
    console.log(r);
    this.router.navigate(["/reports"]);
    

  }

  onBack(){
    this.router.navigate(["/reports"])
  }

  storagePut(r:any): void {
    this.http.put(`https://272.selfip.net/apps/9J0OxNFbmy/collections/data/documents/${r.cid}/`, { key:r.cid, data: r }).subscribe(
      (response:any) => {
        console.log(response);
      }
    )
  }


}


