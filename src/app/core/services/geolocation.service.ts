import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn:"root"})
export class GeolocationService {
  constructor(private http:HttpClient){}
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  showPosition(position:any) {return "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;};
  //
  sendTurewayGeolocationReq = async () => {
    //const axios = require('axios');
    const options = {
      method: 'GET',
      url: 'https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix',
      params: {
        origins: '40.629041,-74.025606;40.630099,-73.993521;40.644895,-74.013818;40.627177,-73.980853',
        destinations: '40.629041,-74.025606;40.630099,-73.993521;40.644895,-74.013818;40.627177,-73.980853'
      },
      headers: {
        'X-RapidAPI-Key': '10174f0098mshac8e6f4179ad0c3p14d018jsna05bafbb92dd',
        'X-RapidAPI-Host': 'trueway-matrix.p.rapidapi.com'
      }
    };
    try {
      const response = {} as any;//await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  lookupAddress = (o:any) => {
    //const axios = require('axios');
    const url =  '/geoapi/';
    const options = {
      params: {
        ...o,
        country: 'USA',
        'accept-language': 'en',
        polygon_threshold: '0.0'
      },
      headers: {
        'X-RapidAPI-Key': '10174f0098mshac8e6f4179ad0c3p14d018jsna05bafbb92dd',
        'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
      }
    };
    return this.http.get(url,options);
    /*
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    */
  }
}