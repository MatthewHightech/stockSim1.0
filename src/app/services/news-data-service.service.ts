import { Injectable } from '@angular/core';
import { CompanyDataService } from './company-data.service';
import { newspaper } from './newspaper.model';

@Injectable({
  providedIn: 'root'
})
export class NewsDataServiceService {

  currentPaper: newspaper = {
    day: 0, 
    title: "test", 
    articles: [], 
    paper: ""
  };

  newspapers: newspaper[] = [
    {
      day: 0, 
      title: "NA Times " + "Day 1", 
      articles: [
        "Pipeline Predicament", 
        "A Dying Dog", 
        "Low Jabs, High Budgets", 
        "A Very Frosty Time"
      ], 
      paper: "NA1.png"
    }, 
    {
      day: 1, 
      title: "NA Times " + "Day 2", 
      articles: [
        "Race to the Finish Line", 
        "Surprise Launch", 
        "Campaigning Begins", 
        "Reigning it in"
      ], 
      paper: "NA2.png"
    }, 
    {
      day: 2, 
      title: "NA Times " + "Day 3", 
      articles: [
        "Strong Performance", 
        "Protoflop", 
        "All Eyes on BC", 
        "Not So Ethical", 
        "A Second Chance"
      ], 
      paper: "NA3.png"
    }, 
    {
      day: 3, 
      title: "NA Times " + "Day 4", 
      articles: [
        "Landslide", 
        "Charity for Redemption", 
        "Going to Court"
      ], 
      paper: "NA4.png"
    }, 
    {
      day: 4, 
      title: "NA Times " + "Day 5", 
      articles: [
        "Pipeline Win", 
        "Second Time’s the Charm?", 
        "Locals First"
      ], 
      paper: "NA5.png"
    }
  ]; 

  constructor() { }


}
