import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { DataService } from '../services/data.service';
import { IMetric } from '../models/metric';
import { ILocation } from '../models/location';
import { IWeatherRQ } from '../models/weather';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() change: EventEmitter<IWeatherRQ> = new EventEmitter();

  locations: ILocation[];
  metrics: IMetric[];

  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    const to = new Date();
    const from = new Date(to.getFullYear(), 0, 1);

    this.searchForm = this.fb.group({
      location: ['', Validators.required],
      metric: ['', Validators.required],
      from: [from, Validators.required],
      to: [to, Validators.required]
    });

    this.onChanges();
  }

  ngOnInit() {
    forkJoin([
      this.dataService.getLocations(),
      this.dataService.getMetrics()
    ]).subscribe(values => {
      this.locations = values[0];
      this.metrics = values[1];

      this.searchForm.patchValue({
        'location': this.locations.length !== 0 ? this.locations[0] : '',
        'metric': this.metrics.length !== 0 ? this.metrics[0] : '',
      });
    });
  }

  onChanges(): void {
    this.searchForm.valueChanges.subscribe(value => {
      if (this.searchForm.valid) {
        this.change.emit(value);
      }
    });
  }
}
