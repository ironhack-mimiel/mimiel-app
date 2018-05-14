import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Address } from 'angular-google-place';

@Component({
  selector: 'app-geocode',
  templateUrl: './geocode.component.html',
  styleUrls: ['./geocode.component.css']
})
export class GeocodeComponent implements OnInit {
  constructor() {}

  @Output() onGetFormatedAddress = new EventEmitter<Object>();

  public options = {
    type: 'address',
    componentRestrictions: { country: 'ES' }
  };

  ngOnInit() {}

  /* getAddress(place: Address) {
    console.log('Address', place);
  } */

  getFormattedAddress(event: any) {
    const location = {
      city: event.city,
      coordinates: [event.lat, event.lng]
    }

    this.onGetFormatedAddress.emit(location);
  }
}
