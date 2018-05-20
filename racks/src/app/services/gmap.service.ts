import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GCoords } from '../interfaces/g-coords';
import { constants } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class GmapService {
  apiKey: string = constants.gmapApiKey;
  apiUrl: string = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.apiKey}&address=`;

  constructor(private http: HttpClient) { }

  getCoordinates(address: string) {
    let url = this.apiUrl + address;
    return this.http.get<GCoords>(url);
  }
}
