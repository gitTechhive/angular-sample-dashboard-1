import { Component, Input, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexMarkers, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';

export type ChartOptionsCol = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

export type ChartOptionsBar = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  fill: ApexFill;
};

export type ChartOptionsDonut = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chartOptionsCol: Partial<ChartOptionsCol>;
  chartOptionsBar: Partial<ChartOptionsBar>;
  chartOptionsDonut: Partial<ChartOptionsDonut>;

  constructor() {

    this.chartOptionsCol = {
      series: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22, 43, 10]
        },
        {
          name: "PRODUCT B",
          data: [13, 23, 20, 8, 13, 27, 10]
        },
        {
          name: "PRODUCT C",
          data: [11, 17, 15, 15, 21, 14, 10]
        },
        {
          name: "PRODUCT D",
          data: [21, 7, 25, 13, 22, 8,10]
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: true
        },
        width: 700,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: "category",
        categories: [
          "Dec 01",
          "Dec 02",
          "Dec 03",
          "Dec 04",
          "Dec 05",
          "Dec 06",
          "Dec 07",
        ]
      },
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1,
        colors: ['#2A85FF', '#83BF6E', '#FFA114','#FF6A55']
      },
      dataLabels: {
        style: {
          colors: ['#2A85FF', '#83BF6E', '#FFA114','#FF6A55']
        }
      }
    };

    this.chartOptionsBar = {
      series: [
        {
          name: "Rating",
          data: [400, 430, 448, 470, 540, 580]
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        width: 700,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: true
        },
      },
      fill: {
        colors: ['#FF6A55']
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
        ]
      },
      
    };

    this.chartOptionsDonut = {
      series: [44, 55, 13, 20],
      chart: {
        type: "donut",
        height: 350,
        width: 700,
      },
      labels: ["Mobile", "Desktop", "Tablet", "Fridge"],
      fill: {
        colors: ['#2A85FF', '#83BF6E', '#FFA114','#FF6A55']
      },
      dataLabels: {
        style: {
          colors: ['#2A85FF', '#83BF6E', '#FFA114','#FF6A55']
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

  }

  ngOnInit() {
  }

}
