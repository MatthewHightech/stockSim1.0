import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { CompanyDataService } from 'src/app/services/company-data.service';
import { company } from 'src/app/services/company.model';
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
      }], 
      yAxes: [{
        ticks: {
            min: 0
        }
    }], 
  }
  };

  chartLegend = false;
  chartPlugins = [];
  chartType = 'line';

  constructor(public userDataService: UserDataService, public companyService: CompanyDataService) {}

  ngOnInit() {
    this.loadGraphData(); 
  }

  
  loadGraphData() {
    this.currentPortfolioData = [];
    let coordinates = []; 
    for (let i = 0; i < 5; i++) {
      if (i < this.companyService.currentDay) {
          let totalPortfolio = 0;
          this.userDataService.user.portfolio.forEach(element => {
            totalPortfolio += (element.numberOfStocks*this.priceOnDay(element.company, i)); 
          });
          let y = this.userDataService.user.budget + totalPortfolio; 
          coordinates.push({
            x: i+1, 
            y: y
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
  
  priceOnDay(company: string, day: number): number {
    let returnValue; 
    this.companyService.companies.forEach(element => {
      if (element.name == company) {
        returnValue = element.prices[day]; 
      }
    });
    return returnValue; 
  }

  getTime(date) {
    return new Date(date).toLocaleDateString();
  }

}
