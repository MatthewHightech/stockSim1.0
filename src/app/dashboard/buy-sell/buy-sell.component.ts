import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyDataService } from 'src/app/services/company-data.service';
import { company } from 'src/app/services/company.model';
import { UserDataService } from 'src/app/services/user-data.service';
import { user } from 'src/app/services/user.model';
import { TradePopupComponent } from './trade-popup/trade-popup.component';

import { ChartDataSets, ChartOptions } from 'chart.js';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-buy-sell',
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.scss'],
})
export class BuySellComponent implements OnInit {

  buyPopup = null;
  sellPopup = null; 

  constructor(
    public authService: AuthService,
    public userService: UserDataService,
    public companyService: CompanyDataService, 
    public popoverController: PopoverController) {}

  
  currentStockData: ChartDataSets[] = []; 
  /*
  [
    {
      data: [
        {
          x: 
          y:
        }, 
        {
          x2:
          y2:
        }
      ], 
      label: "", 
      pointRadius: 1
    }, 
    // element 2
  ]
  */

  chartOptions = {
    responsive: true,
    maintainAspectRatio: true, 
    aspectRatio: 1,
    animation: false,
    scales: {
      xAxes: [{
          type: 'time',
          time: {
              unit: 'minute'
          }
      }]
  }
  };

  chartLegend = false;
  chartPlugins = [];
  chartType = 'line';

  
  ngOnInit() {
    this.companyService.currentCompany.currentPrice = this.companyService.currentCompany.prices[this.companyService.currentDay-1]; 
    this.loadGraphData(); 
  }

  changePage(company: number) {
    this.companyService.currentCompany = this.companyService.companies[company]; 
    this.companyService.currentCompany.currentPrice = this.companyService.currentCompany.prices[this.companyService.currentDay-1]; 
    this.loadGraphData(); 
    console.log(this.companyService.currentCompany); 
  }

  loadGraphData() {
    console.log(new Date()); 
    console.log("load graph length: " + this.companyService.currentCompany.prices.length)
    this.currentStockData = [];
    let coordinates = []; 
    for (let i = 0; i < this.companyService.currentCompany.prices.length; i++) {
      if (i < this.companyService.currentDay) {
          coordinates.push({
            x: i+2, 
            y: this.companyService.currentCompany.prices[i]
          }); 
      } else {
        break; 
      }
    } // for each price change
    this.currentStockData.push({
      data: coordinates, 
      label: "Stock Graph", 
      pointRadius: 1
    }); 
    console.log(this.currentStockData); 
  } // loadGraphData

    // async function to control the potential popups for the game. This includes a buy and sell popup
    popover = async function presentPopover(type: string) { 
      if (type == "Buy") {
        this.buyPopup = await this.popoverController.create({
          component: TradePopupComponent,
          componentProps: {
            popover: this.buyPopup, 
            type: "Buy"
          },  
          cssClass: 'my-custom-popup',
          translucent: true, 
          backdropDismiss: true
        });
        return await this.buyPopup.present();
      } else if (type == "Sell") {
        this.sellPopup = await this.popoverController.create({
          component: TradePopupComponent,
          componentProps: {
            popover: this.sellPopup, 
            type: "Sell"
          },  
          cssClass: 'my-custom-popup',
          translucent: true, 
          backdropDismiss: true
        });
        return await this.sellPopup.present();
      }
  
    } // presentPopover

}
