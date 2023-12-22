import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

import * as Model from "../report-class";
import rep = Model.report; 
import { ReportsService } from '../reports.service';
import { LeafletMouseEvent } from 'leaflet';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  public latitude!:number;
  public longitude!:number;
  public map!: L.Map

  public marker!: any

  constructor(private ps: PlacesService){}

  ngOnInit(): void {
    this.showMap()
  }

  showMap() {
    this.map = L.map('mapid').setView([49.27, -123], 11);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',

    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      this.onClick(e);
    });
  }

  onClick(e: any) {
    
    const latlng = this.map.mouseEventToLatLng(e.originalEvent);
    this.latitude = latlng.lat;
    this.longitude = latlng.lng;

    this.ps.setLatitude(this.latitude);
    this.ps.setLongitude(this.longitude);
    
    if (this.marker != null){
      this.map.removeLayer(this.marker)
    }
    this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map)
  }



}

