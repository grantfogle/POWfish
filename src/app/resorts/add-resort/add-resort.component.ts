import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {Resort} from '../shared/resort.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-resort',
  templateUrl: './add-resort.component.html',
  styleUrls: ['./add-resort.component.css']
})
export class AddResortComponent implements OnInit {
  @Output() resortCreated = new EventEmitter<Resort>();

  resortName = '';
  resortCity = '';
  resortProvince = '';
  resortLocation = '';
  resortCountry = '';
  resortLatitude = '';
  resortLongitude = '';
  resortRating = 0;
  initalImage = '';
  resortImagePath = '';
  resortSkiPasses = '';
  resortSnowInInches = '';
  resortDescription = '';
  resortLiftTicketCost = 0;
  resortForFirebase = {
    resortName: this.resortName,
    resortGeo: this.resortLocation
  }
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchResorts();
  }

  resetForm() {
    this.resortName = '';
    this.resortCity = '';
    this.resortProvince = '';
    this.resortLocation = '';
    this.resortCountry = '';
    this.resortRating = 0;
    this.resortImagePath = '';
    this.resortSkiPasses = '';
    this.resortSnowInInches = '';
    this.resortDescription = '';
    this.resortLiftTicketCost = 0;
  }

  onAddResort() {
    this.resortCreated.emit({
        name: this.resortName,
        location: this.resortLocation,
        country: this.resortCountry,
        rating: this.resortRating,
        description: this.resortDescription,
        imagePath: this.resortImagePath,
        skiPasses: this.resortSkiPasses,
        snowInInches: this.resortSnowInInches,
        latlong: '',
        geo: ['',''],
        reviews: ['', ''],
        liftPassCost: this.resortLiftTicketCost
    });
    // this.onCreateResort();
    // this.fetchResorts();
    this.resetForm();
  }

  onCreateResort() {
    // check for empty fields, if empty fields throw an alert
    // set a timeout to show then hide alert
    const url = 'https://powfish.firebaseio.com/resorts.json';
    let resorts = {
      resortName: this.resortName,
      resortGeo: this.resortLocation

    }
    this.http.post(
      url,
      resorts
      ).subscribe(responseData => {
        console.log(responseData);
      });
  }

  private fetchResorts() {
    console.log('called');
    // const cors = 'https://cors-anywhere.herokuapp.com/'
    const url = 'https://powfish.firebaseio.com/resorts.json';
    this.http.get(url)
      .pipe(map(responseData => {
        console.log('asdfa', responseData);
        const resortsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            resortsArray.push({...responseData[key], id: key})
          }
        }
        return resortsArray;
      }))
      .subscribe(response => {
        console.log(response);
      })
  }
}
