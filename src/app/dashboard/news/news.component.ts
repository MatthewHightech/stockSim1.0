import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CompanyDataService } from 'src/app/services/company-data.service';
import { NewsDataServiceService } from 'src/app/services/news-data-service.service';
import { newspaper } from 'src/app/services/newspaper.model';
import { UserDataService } from 'src/app/services/user-data.service';
import { NewsPopupComponent } from './news-popup/news-popup.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  currentPaper: newspaper = {
    day: 0, 
    title: "test", 
    articles: [], 
    paper: ""
  };

  newsPopup = null;

  constructor(
    public newsDataService: NewsDataServiceService,
    public companyDataService: CompanyDataService,
    public UserDataService: UserDataService, 
    public popoverController: PopoverController) { }

  ngOnInit() {
    this.currentPaper = this.newsDataService.newspapers[this.UserDataService.user.day-1]; 
  }

      // async function to control the potential popups for the game. This includes a buy and sell popup
      popover = async function presentPopover(id: string) { 
          this.buyPopup = await this.popoverController.create({
            component: NewsPopupComponent,
            componentProps: {
              popover: this.newsPopup, 
              paper: id
            },  
            cssClass: 'my-custom-news',
            translucent: true, 
            backdropDismiss: true
          });
          return await this.buyPopup.present(); 
      } // presentPopover

}
