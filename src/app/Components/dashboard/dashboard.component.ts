import { Component } from '@angular/core';
import {CanvasJS } from '@canvasjs/angular-charts';
declare var require: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  content  = "0A"
  content2 = "0V"

  gaugeValue = 28.3;

  dataPoints1: any[] = [];
  dataPoints2: any[] = [];

  chart: any = new CanvasJS.Chart;

  chartOptions = {
    zoomEnabled: true,
    theme: "light2",
    toolTip: {
      shared: true
    },
    legend: {
      cursor:"pointer",
      verticalAlign: "top",
      fontSize: 22,
      fontColor: "dimGrey",
      itemclick : function(e:any) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        }
        else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: [{
      type: "line",
      xValueType: "dateTime",
      yValueFormatString: "$####.00",
      xValueFormatString: "hh:mm:ss TT",
      showInLegend: true,
      name: "Ток",
      dataPoints: this.dataPoints1
    }, {
      type: "line",
      xValueType: "dateTime",
      yValueFormatString: "$####.00",
      showInLegend: true,
      name: "Напряжение" ,
      dataPoints: this.dataPoints2
    }]
  }

  getChartInstance(chart: object) {
    this.chart = chart;

    this.time.setHours(9);
    this.time.setMinutes(30);
    this.time.setSeconds(0);
    this.time.setMilliseconds(0);

    this.updateChart(100);
  }

  updateInterval = 1000;

  yValue1 = 90;
  yValue2 = 97;
  time = new Date();

  updateChart = (count: any) => {
    count = count || 1;
    var deltaY1, deltaY2;
    for (var i = 0; i < count; i++) {
      this.time.setTime(this.time.getTime()+ this.updateInterval);
      deltaY1 = .5 + Math.random() *(-.5-.5);
      deltaY2 = .5 + Math.random() *(-.5-.5);

      this.yValue1 = Math.round((this.yValue1 + deltaY1)*100)/100;
      this.yValue2 = Math.round((this.yValue2 + deltaY2)*100)/100;

      this.dataPoints1.push({
        x: this.time.getTime(),
        y: this.yValue1
      });
      this.dataPoints2.push({
        x: this.time.getTime(),
        y: this.yValue2
      });
    }

    this.chart.render();
  }

  constructor() {
    setInterval(() => {
      this.content = Math.floor(Math.random() * 100)+"A"
      this.content2 = Math.floor(Math.random() * 100)+"V"
      this.gaugeValue = Math.floor(Math.random() * 100)
      this.updateChart(1);
    }, 1000)
  }
}
