import { Component, OnInit } from '@angular/core';
import { CompanyDataService } from 'src/app/services/company-data.service';
import { company } from 'src/app/services/company.model';
import { UserDataService } from 'src/app/services/user-data.service';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {


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
            min: this.minOrDefault()
        }
    }], 
  }
  };

  chartLegend = false;
  chartPlugins = [];
  chartType = 'line';

  constructor(public userDataService: UserDataService, public companyService: CompanyDataService) {}

  ngOnInit() {
    this.userDataService.updateUserPortfolioChart(this.companyService.companies); 
  }

  // Helper Functions

  minOrDefault() {
    if (this.userDataService.currentPortfolioData[0] != undefined) {
      return this.getMinPortfolioAmount(); 
    } else {
      return 0; 
    }
  }

  getMinPortfolioAmount() {
    let minAmount = 1000000;
    this.userDataService.currentPortfolioData[0].data.forEach(element => {
      if (element.y < minAmount) {
        minAmount = element.y; 
      }
    });
    return minAmount-1000; 
  }

  getTime(date) {
    return new Date(date).toLocaleDateString();
  }

}
