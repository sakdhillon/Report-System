import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private latitude: number = 0;
  private longitude: number = 0;

  constructor() { }

  

  setLatitude(latitude: number): void {
    this.latitude = latitude;
  }

  getLatitude(): number {
    return this.latitude;
  }

  setLongitude(longitude: number): void {
    this.longitude = longitude;
  }

  getLongitude(): number {
    return this.longitude;
  }

}
