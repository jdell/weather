import { Injectable } from '@angular/core';
import { IWeatherRQ, IWeatherRS } from '../models/weather';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IMetric } from '../models/metric';
import { ILocation } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getWeather(request: IWeatherRQ): Observable<IWeatherRS[]> {
    // TODO: For test purposes only
    const url: string = this.convertUrl(request.metric, request.location);
    return this.http.get<IWeatherRS[]>(url).pipe(map(items => items.filter(item => this.inDate(request.from, request.to, item))));
  }

  // ----- TODO: For test purposes only -----
  private convertUrl(metric: string, location: string) {
    return `https://s3.eu-west-2.amazonaws.com/interview-question-data/metoffice/${metric}-${location}.json`;
  }
  private inDate(from: Date, to: Date, item: IWeatherRS): boolean {
    const itemDate: Date = new Date(item.year, item.month - 1, 1);
    return this.cleanDate(from) <= itemDate && itemDate <= this.cleanDate(to);
  }
  private cleanDate(date: Date): Date {
    const cleaned = new Date();
    cleaned.setTime(date.getTime());
    cleaned.setDate(1);
    cleaned.setHours(0, 0, 0, 0);
    return cleaned;
  }

  getLocations(): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(`/assets/data/locations.json`);
  }

  getMetrics(): Observable<IMetric[]> {
    return this.http.get<IMetric[]>(`/assets/data/metrics.json`);
  }
}
