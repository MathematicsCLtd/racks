import { Component, OnInit } from '@angular/core';
import { GmapService } from '../services/gmap.service';

@Component({
  selector: 'my-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  myPos: any = { lat: 0, lng: 0 };
  origin: string;
  trail: string;
  destination: string;
  dir: any = {
    origin: {},
    trail: {},
    destination: {}
  };
  zoom: number = 16;
  travelMode: string = 'BICYCLING';
  //travelMode: string = 'TRANSIT';

  constructor(private gmap: GmapService) { }

  ngOnInit() {
    this.getLocation();
    this.origin = '';
    this.trail = '';
    this.destination = '';
  }

  onSubmit() {
    let request = {
      origin: this.origin,
      trail: this.trail,
      destination: this.destination
    };
    this.getCoordinates(request);
  }

  getCoordinates(req) {
    Object.keys(req).forEach(key => {
      this.gmap.getCoordinates(req[key]).subscribe(ret => {
        if (ret) {
          this.dir[key] = ret.results[0].geometry.location;
        } else {
          console.log(ret);
        }
      });
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        this.myPos.lat = position.coords.latitude;
        this.myPos.lng = position.coords.longitude;
      })
    } else {
      console.log('Geoposition not supported');
    }
  }
}
