import { Component, OnInit } from '@angular/core';
import { CompanyDataService } from 'src/app/services/company-data.service';
import { NewsDataServiceService } from 'src/app/services/news-data-service.service';
import { newspaper } from 'src/app/services/newspaper.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  currentPaper: newspaper = {
    day: 0, 
    title: "test", 
    articles: []
  };

  constructor(public newsDataService: NewsDataServiceService, public companyDataService: CompanyDataService) { }

  ngOnInit() {
    this.currentPaper = this.newsDataService.newspapers[this.companyDataService.currentDay-1]; 
  }

}
