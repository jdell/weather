import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IWeatherRS } from '../models/weather';
import * as CanvasJS from '../../assets/scripts/canvasjs.min';

interface ICanvasJsDataPoint {
  y: number;
  label: string;
}

@Component({
  selector: 'app-canvas-js-renderer',
  templateUrl: './canvas-js-renderer.component.html',
  styleUrls: ['./canvas-js-renderer.component.css']
})
export class CanvasJsRendererComponent implements OnInit, OnChanges {
  @Input() items: IWeatherRS[];
  chart: any;

  constructor() { }

  ngOnInit() {
    this.chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Weather data'
      },
      data: [{
        type: 'column',
        dataPoints: []
      }]
    });

    this.chart.render();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart === undefined || this.chart === null) {
      return;
    }

    this.chart.options.data[0].dataPoints = this.convertToDataPoint(changes['items'].currentValue);
    this.chart.render();
  }

  private convertToDataPoint(items: IWeatherRS[]): ICanvasJsDataPoint[] {
    if (items === undefined || items === null) {
      return [];
    }

    return items.map(item => {
      return {
        y: item.value,
        label: `${item.month}/${item.year}`
      };
    });
  }
}
