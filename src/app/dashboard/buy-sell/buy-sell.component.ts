import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyDataService } from 'src/app/services/company-data.service';
import { company } from 'src/app/services/company.model';
import { UserDataService } from 'src/app/services/user-data.service';
import { user } from 'src/app/services/user.model';
import { TradePopupComponent } from './trade-popup/trade-popup.component';

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


  ngOnInit() {}

  changePage(company: number) {
    this.companyService.currentCompany = this.companyService.companies[company]; 
    console.log(this.companyService.currentCompany); 
  }

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
