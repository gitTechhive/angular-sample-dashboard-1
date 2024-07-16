import { Component, OnInit } from '@angular/core';
import { Deserialize } from 'cerialize';
import { Charts } from 'src/app/models/Charts';
import { Dashboard } from 'src/app/models/Dashboard';
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
  columnChart: Charts;
  /**Variable to Store Line Chart data */
  lineChart: Charts;
  /**Variable to Store Bar Chart data */
  barChart: Charts;
  /**Variable to Store Donut Chart data */
  donutChart: Charts;
  /**Variable to Store Vertical Bar Chart data */
  verticalBarChart: Charts;
  /**Dashboard Data variable */
  dashboardData = new Dashboard();

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

        this.dashboardData = Deserialize(response, Dashboard);

        this.chartData = response.chartData.map(chart => {
          return {
            ...chart,
            value: JSON.parse(chart.value)
          };
        });

        this.columnChart  = Deserialize(this.chartData.filter(v => v.chartType === 'columnChart')[0]?.value)
        this.lineChart    = Deserialize(this.chartData.filter(v => v.chartType === 'lineChart')[0]?.value)
        this.barChart     = Deserialize(this.chartData.filter(v => v.chartType === 'barChart')[0]?.value)
        this.donutChart   = Deserialize(this.chartData.filter(v => v.chartType.trim() === 'donutChart')[0]?.value)
        this.verticalBarChart = Deserialize(this.chartData.filter(v => v.chartType.trim() === 'donutChart')[0]?.value)    
      }
    })
  }

}
