import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('createNewSection') private createNewSection : ElementRef;

  constructor() { }

  ngOnInit() {
  }

  private showCreateNewSection(): void {
    this.createNewSection.nativeElement.style.display = 'block';
    $("html, body").animate({ scrollTop: $('#createNewSection').offset().top }, 1000);
  }

  private hideCreateNewSection(): void {
    this.createNewSection.nativeElement.style.display = 'none';
  }

}
