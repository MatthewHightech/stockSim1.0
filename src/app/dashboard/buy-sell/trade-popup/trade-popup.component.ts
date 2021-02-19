import { Component, OnInit, Input } from '@angular/core';
import { CompanyDataService } from 'src/app/services/company-data.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-trade-popup',
  templateUrl: './trade-popup.component.html',
  styleUrls: ['./trade-popup.component.scss'],
})
export class TradePopupComponent implements OnInit {

  @Input() popover;
  @Input() type; 

  error: string = ""; 

  numStocksBought: number = 0; 
  PURCHASEPERCENT: number = 0.1; 

  constructor(public companyService: CompanyDataService, public userDataService: UserDataService) { }

  subtotal: number = 0; 
  purchaseFee: number = 0; 
  total: number = 0; 

  success: boolean = false; 

  ngOnInit() {}

  updateTotals() {
    this.subtotal= this.numStocksBought*this.companyService.currentCompany.currentPrice;
    this.purchaseFee= this.subtotal*this.PURCHASEPERCENT; 
    this.total= this.subtotal + this.purchaseFee; 
  }

  confirmTransaction() {
    if (this.type == 'Buy') {
      if (this.userDataService.user.budget > this.total) {
        this.userDataService.stockTransaction(
          this.type,
          this.total,
          this.companyService.currentCompany.name,
          this.numStocksBought,
          this.companyService.currentCompany.currentPrice
        ); 
        this.success = true; 
        setTimeout(() => {this.popover.dismiss().then(() => { this.popover = null; });}, (2000)); 
        
      } else {
        this.error = "You do not have enough funds"; 
      }
    } else {
      this.userDataService.stockTransaction(
        this.type,
        this.total,
        this.companyService.currentCompany.name,
        this.numStocksBought,
        this.companyService.currentCompany.currentPrice
      ); 
    }
    // check if user has enough money
    // if so, subtract or add the transation based on it's "type"
    // add or subtract the stocks from the users portfolio

  }

}
