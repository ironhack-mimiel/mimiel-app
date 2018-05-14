import { Component, OnInit } from '@angular/core';
import { Address } from 'angular-google-place';

@Component({
  selector: 'app-geocode',
  templateUrl: './geocode.component.html',
  styleUrls: ['./geocode.component.css']
})
export class GeocodeComponent implements OnInit {
  constructor() {}

  lat: number;
  lng: number;

  public options = {
    type: 'address',
    componentRestrictions: { country: 'ES' }
  };

  ngOnInit() {}

  getAddress(place: Address) {
    console.log('Address', place);
  }
  getFormattedAddress(event: any) {
    this.lat = event.lat;
    this.lng = event.lng;
    console.log(this.lat, this.lng)
  }
}
