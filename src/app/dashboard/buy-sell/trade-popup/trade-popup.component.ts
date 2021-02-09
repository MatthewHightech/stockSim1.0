import { Component, OnInit, Input } from '@angular/core';
import { CompanyDataService } from 'src/app/services/company-data.service';

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

  constructor(public companyService: CompanyDataService) { }

  subtotal: number = 0; 
  purchaseFee: number = 0; 
  total: number = 0; 

  ngOnInit() {}

  updateTotals() {
    this.subtotal= this.numStocksBought*this.companyService.currentCompany.currentPrice;
    this.purchaseFee= this.subtotal*this.PURCHASEPERCENT; 
    this.total= this.subtotal + this.purchaseFee; 
  }

  confirmTransaction() {
    // check if user has enough money
    // if so, subtract or add the transation based on it's "type"
    // add or subtract the stocks from the users portfolio

    this.popover.dismiss().then(() => { this.popover = null; });
  }

}
