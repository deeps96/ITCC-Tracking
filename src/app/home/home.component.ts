import {Component, ElementRef, ViewChild} from '@angular/core';

import * as $ from 'jquery';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild ('search') private search: ElementRef;
  @ViewChild('createNewSection') private createNewSection: ElementRef;

  constructor(private router: Router) { }

  public onSubmit(): void {
    this.router.navigate(['track', this.search.nativeElement.value]);
  }

  public showCreateNewSection(): void {
    this.createNewSection.nativeElement.style.display = 'block';
    $("html, body").animate({ scrollTop: $('#createNewSection').offset().top }, 1000);
  }

  public hideCreateNewSection(): void {
    this.createNewSection.nativeElement.style.display = 'none';
  }

}
