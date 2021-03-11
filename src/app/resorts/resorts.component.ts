import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Resort } from './shared/resort.model';
import { ResortModalComponent } from './resort-modal/resort-modal.component';
import { ModalService } from '../services/modal.service';
import { ResortsService } from '../services/resorts.service';

@Component({
  selector: 'app-resorts',
  templateUrl: './resorts.component.html',
  styleUrls: ['./resorts.component.css'],
  providers: [ResortsService]
})
export class ResortsComponent implements OnInit {
  showAddResortForm = false;
  resorts: Resort[];
  @Input() displayResorts: Resort[];

  constructor(public modalService: ModalService,
    public resortsService: ResortsService,
    public http: HttpClient) {

    this.resorts = this.resortsService.getAllResorts();
    this.displayResorts = this.resortsService.filteredResorts;
  }

  initResortModal(resortData) {
    let outputs = {
      resort: resortData
    }
    this.modalService.init(ResortModalComponent, {}, outputs);
  }

  ngOnInit() {
    this.resortsService.retrieveResortsFromDb();
  }

  toggleAddResortForm() {
    this.showAddResortForm = !this.showAddResortForm;
  }

  addResort(resort: Resort) {
    this.resorts.push(resort);
  }

  filterResorts(filterWord: string) {
    console.log(filterWord);
    let filterArr = this.resorts.filter(resort => {
      let name = resort.name.toLowerCase().indexOf(filterWord);
      let country = resort.country.toLowerCase().indexOf(filterWord);
      let region = resort.city.toLowerCase().indexOf(filterWord);
      if (name !== -1 || country !== -1 || region !== -1) {
        return resort;
      }
    })
    this.displayResorts = filterArr;
  }

  filterResortsByPass(pass: string) {
    this.resortsService.filterBySkiPass(pass);
    this.displayResorts = this.resortsService.filteredResorts;
  }

  resetResortFilters() {
    this.resortsService.resetResorts();
    this.displayResorts = this.resortsService.filteredResorts;
  }

  filterResortsForPowder() {
    this.resortsService.filterResortsBySnowfall();
    this.displayResorts = this.resortsService.filteredResorts;
  }

  filterByPrice() {
    this.resortsService.filterByResortAffordability();
    this.displayResorts = this.resortsService.filteredResorts;
  }

}
