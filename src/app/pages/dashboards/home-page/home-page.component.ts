import { Component, OnInit } from '@angular/core';
import { Sellingproduct, Widget, ChartType } from './sellingproduct.model';

import {
  widgetData, revenueAreaChart, projectionsDonutChart, incomeBarChart,
  recentuserAreaChart, salesStatusChart, productData
} from './data';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  // Charts data
  revenueAreaChart: ChartType;
  projectionsDonutChart: ChartType;
  incomeBarChart: ChartType;
  recentuserAreaChart: ChartType;
  salesStatusChart: ChartType;
  breadCrumbItems: Array<{}>;

  // Widget data
  widgetData: Widget[];
  // Product data
  productData: Sellingproduct[];

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'Minton', path: '/' }, { label: 'Dashboard', path: '/' }, { label: 'Dashboard', path: '/', active: true }];

    /**
     * Fetches data
     */
    this._fetchData();
  }

  /**
   * fetches the Dashboard-2 data
   */
  private _fetchData() {
    // widget data
    this.widgetData = widgetData;
    // Revenue Area chart
    this.revenueAreaChart = revenueAreaChart;

    // Projections Donut Chart
    this.projectionsDonutChart = projectionsDonutChart;

    // Income Status Bar chart
    this.incomeBarChart = incomeBarChart;

    // Recent Users area chart
    this.recentuserAreaChart = recentuserAreaChart;

    // Sales Status chart
    this.salesStatusChart = salesStatusChart;

    // table Data
    this.productData = productData;
  }

  /**
   * on table data refresh
   */
  onTableContentRefresh() {
    console.log('table data refresh requested');
  }

}
