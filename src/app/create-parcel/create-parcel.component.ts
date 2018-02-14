import { Component, OnInit } from '@angular/core';
import {Location} from "../parcel-management";

@Component({
  selector: 'app-create-parcel',
  templateUrl: './create-parcel.component.html',
  styleUrls: ['./create-parcel.component.css']
})
export class CreateParcelComponent implements OnInit {

  public departure: Location;
  public destination: Location;
  public parcelTypeNames: string[];
  private selectedParcelType: string;

  constructor() {
    this.departure = new Location();
    this.destination = new Location();
  }

  ngOnInit() {
  }

  public parcelTypeChanged(selectedType: any): void {
    this.selectedParcelType = this.parcelTypeNames[selectedType.target.options.selectedIndex - 1];
  }

  public onSubmit(): void {

  }

}
