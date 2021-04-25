import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-popup',
  templateUrl: './news-popup.component.html',
  styleUrls: ['./news-popup.component.scss'],
})
export class NewsPopupComponent implements OnInit {

  @Input() popover;
  @Input() paper
  constructor() { }

  ngOnInit() {}

}
