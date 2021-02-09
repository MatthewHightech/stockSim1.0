import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';

// components
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import { TradePopupComponent } from './buy-sell/trade-popup/trade-popup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage, PortfolioComponent, NewsComponent, HomeComponent, BuySellComponent, TradePopupComponent]
})
export class DashboardPageModule {}
