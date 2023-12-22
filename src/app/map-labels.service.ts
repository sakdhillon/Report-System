import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';


@Injectable({
  providedIn: 'root',
})
export class MapLabelsService {
  public l = ['Stanley Park', 'Metrotown', 'SFU Burnaby'];
  public c = [
    [49.300054, -123.148155],
    [49.2276, -123.0076],
    [49.2781, -122.9199],
  ];

  constructor(private http: HttpClient ) {}

  

}
