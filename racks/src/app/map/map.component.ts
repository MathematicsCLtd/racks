import { Component, OnInit } from '@angular/core';
import { GmapService } from '../services/gmap.service';

@Component({
  selector: 'my-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat: number = 39.959770;
  lng: number = -83.000412;
  address: string = 'Easton Town Center, Easton Town Center, Columbus, OH';
  dir: any = {
    origin: { lat: this.lat, lng: this.lng },
    destination: { lat: 40.1475513, lng: -82.9550197 }
  };
  zoom: number = 13;

  constructor(private gmap: GmapService) { }

  ngOnInit() {
    let destiny = this.getCoordinates();
  }

  getCoordinates() {
    this.gmap.getCoordinates(this.address).subscribe(ret => {
      console.log(ret);
      this.dir.destination = ret.results[0].geometry.location;
    });
  }
}
