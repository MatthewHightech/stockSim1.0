import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {

  constructor(public userDataService: UserDataService) { }

  ngOnInit() {}

  getTime(date) {
    return new Date(date).toLocaleDateString();
  }

}
