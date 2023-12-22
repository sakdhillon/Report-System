import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from '../reports.service';
import { report } from '../report-class';
import { Router } from '@angular/router';
import { LocationsComponent } from '../locations/locations.component';
import { PlacesService } from '../places.service';

import { HttpClient } from '@angular/common/http'; 
import { MapsComponent } from '../maps/maps.component';
import { MapLabelsService } from '../map-labels.service';



@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css'],
  providers: [LocationsComponent]
})
export class AddReportComponent {
  form: FormGroup
  locationDropdown: any;

  long:number = 0;
  lat:number = 0;


  public l = ['Stanley Park', 'Metrotown', 'SFU Burnaby'];

  public c = [[49.300054, -123.148155], [49.2276, -123.0076], [49.2781, -122.9199]];

  constructor(private rs: ReportsService ,private router: Router, private locations: LocationsComponent, private ps: PlacesService, private http: HttpClient, private map: MapLabelsService){
    let formControllers = {
      criminalName: new FormControl('',[
        Validators.required
      ]),
      location: new FormControl('',[
        Validators.required
      ]),
      // picURL: new FormControl(),
      status: new FormControl(),
      extraInfo: new FormControl(),

      witnessName: new FormControl('',[
        Validators.required
      ]),
      witnessNumber: new FormControl('',[
        Validators.required
        //TODO: validator - make sure that it is 10 numbers
      ]),      
    }
    this.form = new FormGroup (formControllers)

  }

  ngOnInit() {
    this.locationDropdown = document.getElementById('location');
    this.populateLocations();
  }

  populateLocations() {
    this.map.l.forEach((location, index) => {
      const option = document.createElement('option');
      option.value = (index + 1).toString();
      option.text = location;
      this.locationDropdown.appendChild(option);
    });
  }

  unpopulateLocations() {
    this.locationDropdown.innerHTML = '';
  }

  onSubmit(newPerson:report){
    console.log(newPerson);
    let i = parseInt(newPerson.location)
    newPerson.location = this.map.l[i-1]

    newPerson.lat = this.map.c[i-1][0]
    newPerson.long = this.map.c[i-1][1]

    newPerson.time = new Date().getTime();

    this.rs.add(newPerson);
    // this.map.addLabels(i, locations, coordinates)
    this.storageAdd(newPerson)
    this.router.navigate(["/reports"])
  }

  onBack(){
    this.router.navigate(["/reports"])
  }

  clickevent (){
    console.log(this.long)
    this.lat = this.ps.getLatitude();
    this.long = this.ps.getLongitude();

    console.log("log", this.long)
    console.log("lat",this.lat)
  }

  saveLocation(){
    const name = document.getElementById('placeName') as HTMLInputElement
    console.log("name",name.value);

    this.map.l.push(name.value);

    const coord = [this.lat, this.long]
    this.map.c.push(coord);

    this.unpopulateLocations()
    this.populateLocations()
    
  }

  storageAdd(newPerson: any): void {
    console.log("PERSONNN", newPerson)
    let x = newPerson.cid;
    this.http.post(`https://272.selfip.net/apps/9J0OxNFbmy/collections/data/documents/`, { key:x, data:newPerson }).subscribe(
      (response:any) => {
        console.log(response);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    )
  }
  
}
