import { Injectable } from '@angular/core';
import { CompanyDataService } from './company-data.service';
import { newspaper } from './newspaper.model';

@Injectable({
  providedIn: 'root'
})
export class NewsDataServiceService {

  newspapers: newspaper[] = [
    {
      day: 1, 
      title: "Daily News " + "Day 1", 
      articles: [
        "article 1", 
        "article 2"
      ]
    }, 
    {
      day: 2, 
      title: "Daily News " + "Day 2", 
      articles: [
        "article 1", 
        "article 2"
      ]
    }, 
    {
      day: 3, 
      title: "Daily News " + "Day 3", 
      articles: [
        "article 1", 
        "article 2"
      ]
    }
  ]; 

  constructor() { }


}
