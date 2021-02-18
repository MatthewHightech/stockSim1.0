import { Component, OnInit } from '@angular/core';
import { CompanyDataService } from 'src/app/services/company-data.service';
import { NewsDataServiceService } from 'src/app/services/news-data-service.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  constructor(public newsDataService: NewsDataServiceService, public companyDataService: CompanyDataService) { }

  ngOnInit() {}

}
