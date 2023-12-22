import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

import * as Model from "../report-class";
import rep = Model.report; 
import { ReportsService } from '../reports.service';
import { AddReportComponent } from '../add-report/add-report.component';
import { MapLabelsService } from '../map-labels.service';
import { HttpClient } from '@angular/common/http';

const markers = [];

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  public map!: L.Map
  reports:rep[];
  

  public labels!: any[]
  constructor(private rs: ReportsService, private m: MapLabelsService, private http: HttpClient){
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

    // this.showMap()
    this.addLabels()

  });

  this.showMap()
  this.addLabels()

  }

  showMap() {
    this.map = L.map('mapid').setView([49.27, -123], 11);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',

    }).addTo(this.map);
  }

  async addLabels(){

    console.log("in hereeeee")
    const r = this.rs.get()
    const location: any[] = []
    const numReports:number[] = []
    for (let i = 0; i < r.length; i++) {
      if (r[i].lat !== undefined && r[i].long !== undefined) {
        let found = false;
    
        for (let j = 0; j < location.length; j++) {
          if (r[i].location === location[j][0]) {
            numReports[j]++;
            found = true;
            break;
          }
        }
    
        if (!found) {
          const l = [r[i].location, r[i].lat, r[i].long];
          location.push(l);
          numReports.push(1);
        }
      } else {
        console.warn('Skipping marker due to undefined latitude or longitude.');
      }
    }
    for(let i = 0; i < location.length; i++){
      const mark = L.marker([location[i][1], location[i][2]]).addTo(this.map).bindPopup("Nuisance Report(s) at  " + r[i].location + ": " + numReports[i]);
    }

  }

  //   for(let i = 0; i < r.length; i++){
  //     if (r[i].lat !== undefined && r[i].long !== undefined) {
  //       const mark = L.marker([r[i].lat, r[i].long]).addTo(this.map).bindPopup("Nuisance Report(s) at  " + r[i].location);
  //     } else {
  //       console.warn('Skipping marker due to undefined latitude or longitude.');
  //     }
  //   }
  // }

  // deleteLabels(){

  // }

}