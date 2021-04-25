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
    if (this.type == 'Buy') {
      this.subtotal= this.numStocksBought*this.companyService.currentCompany.currentPrice;
      this.purchaseFee= this.subtotal*this.PURCHASEPERCENT; 
      this.total= this.subtotal + this.purchaseFee; 
    } else {
      this.subtotal= this.numStocksBought*this.companyService.currentCompany.currentPrice*-1;
      this.purchaseFee= this.subtotal*this.PURCHASEPERCENT*-1; 
      this.total= this.subtotal + this.purchaseFee; 
    }
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
      let totalCompanyStocks = 0; 
      // add up the total number of stocks the user has in a company
      this.userDataService.user.portfolio.forEach(element => {
        if (element.company == this.companyService.currentCompany.name) {
          totalCompanyStocks += element.numberOfStocks; 
        }
      });
      console.log("total company stocks: " + totalCompanyStocks); 
      // if the user has enough stocks, sell
      if (totalCompanyStocks >= this.numStocksBought) {
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
        this.error = "You don't own that many stocks for " + this.companyService.currentCompany.name; 
      }
    }
    // check if user has enough money
    // if so, subtract or add the transation based on it's "type"
    // add or subtract the stocks from the users portfolio

  }

}
