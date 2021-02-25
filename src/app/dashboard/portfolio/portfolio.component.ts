import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { CompanyDataService } from 'src/app/services/company-data.service';
import { UserDataService } from 'src/app/services/user-data.service';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {

  currentPortfolioData: ChartDataSets[] = []; 

  chartOptions = {
    responsive: true,
    maintainAspectRatio: true, 
    aspectRatio: 1,
    animation: false,
    scales: {
      xAxes: [{
          type: 'time',
          time: {
              unit: 'week'
          }
      }]
  }
  };

  chartLegend = false;
  chartPlugins = [];
  chartType = 'line';

  constructor(public userDataService: UserDataService, public companyService: CompanyDataService) {}

  ngOnInit() {
    //this.loadGraphData(); 
  }

  /*
  loadGraphData() {
    this.currentPortfolioData = [];
    let coordinates = []; 
    for (let i = 0; i < this.companyService.currentCompany.prices.length; i++) {
      if (i < this.companyService.currentDay) {
          
          coordinates.push({
            x: i+1, 
            y: this.companyService.currentCompany.prices[i]
          }); 
      } else {
        break; 
      }
    } // for each price change
    this.currentPortfolioData.push({
      data: coordinates, 
      label: "Portfolio Graph", 
      pointRadius: 1
    }); 

  }
  */

  getTime(date) {
    return new Date(date).toLocaleDateString();
  }

}
