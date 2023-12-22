import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http'; 


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})


export class ReportComponent {
  @Input() report: any
  @Output() delete = new EventEmitter()

  validate:boolean;
  wrong: boolean;

  constructor (private router: Router, private http: HttpClient){
    this.validate = false
    this.wrong = false
  }

  onDelete(evt:any, report_cid:number){
    this.validate = true
    evt['report_cid'] = report_cid
    console.log(evt)
    console.log("HAHAHAHAHA IN DELETEEEEE")

    this.storageDelete(report_cid);
    this.delete.emit(evt)

    console.log("hiiii im backkkk")
  }

  storageDelete(report_cid:number): void {
    
    const id= report_cid.toString()
    this.http.delete(`https://272.selfip.net/apps/9J0OxNFbmy/collections/data/documents/${id}/`).subscribe(
      (response:any) => {
        console.log(response);
      }
    )
  }

  onView(evt:any, r:any){
    const cid = r.cid
    this.router.navigate(["/reports",cid])
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
          this.onDelete (evt, report_cid);
        } else{
          this.incorrect()
        }
      }
    )
  }

  incorrect(){
    this.wrong = true;
    setTimeout(() => {
      this.wrong = false;
    }, 1500); 
  }

}



export enum status{
  Open = 'Open',
  Resolved = 'Resolved'
}