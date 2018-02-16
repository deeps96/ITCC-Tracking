import { Component, OnInit } from '@angular/core';
import {Location} from "../parcel-management";
import {ParcelManagementService} from "../parcel-management.service";

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

  constructor(private parcelManagementService: ParcelManagementService) {}

  ngOnInit() {
    this.departure = new Location();
    this.destination = new Location();
    this.selectedParcelType = null;
    this.parcelTypeNames = ['Basic parcel'];
  }

  public parcelTypeChanged(selectedType: any): void {
    this.selectedParcelType = this.parcelTypeNames[selectedType.target.options.selectedIndex - 1];
  }

  public onSubmit(): void {
    this.parcelManagementService
      .createParcel(this.departure, this.destination, this.selectedParcelType)
      .subscribe(response => {
        alert(response);
      });
  }

}
