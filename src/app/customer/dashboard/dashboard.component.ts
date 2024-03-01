import { Component, OnInit } from '@angular/core';
import { ServerVariableService } from 'src/app/shared/services/server-variable.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /**Variable to Store Chart data */
  chartData = new Array<any>();

  /**Variable to Store Column Chart data */
  columnChart: any;
  /**Variable to Store Line Chart data */
  lineChart: any;
  /**Variable to Store Bar Chart data */
  barChart: any;
  /**Variable to Store Donut Chart data */
  donutChart: any;

  constructor(public utilsService: UtilsService, private serverVariableService: ServerVariableService) {

    this.getChartData();

  }

  ngOnInit() {
  }

  /**Retrieving Chart Data */
  getChartData() { 

    this.chartData = new Array();

    const param = {}

    this.utilsService.getMethodAPI(false, this.serverVariableService.DASHBOARD_CHARTS_API, param, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {

        this.chartData = response.map(chart => {
          return {
            ...chart,
            value: JSON.parse(chart.value)
          };
        });

        this.columnChart = this.chartData.filter(v => v.chartType === 'columnChart')[0].value
        this.lineChart = this.chartData.filter(v => v.chartType === 'lineChart')[0].value
        this.barChart = this.chartData.filter(v => v.chartType === 'barChart')[0].value
        this.donutChart = this.chartData.filter(v => v.chartType.trim() === 'donutChart')[0]?.value
      }
    })
  }

}
