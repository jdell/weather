import { Component, OnInit } from '@angular/core';
import { ILocation } from 'selenium-webdriver';
import { IMetric } from './models/metric';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs';
import { IWeatherRQ, IWeatherRS } from './models/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: IWeatherRS[];

  constructor(private dataService: DataService) {

  }

  load(request: IWeatherRQ): void {
    this.dataService.getWeather(request).subscribe(items => {
      this.items = items;
    }, err => {
      // Show error
    });
  }
}
