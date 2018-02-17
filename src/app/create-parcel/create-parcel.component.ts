import { Component, OnInit } from '@angular/core';
import {Location, Parcel} from "../parcel-management";
import {ParcelManagementService} from "../parcel-management.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-parcel',
  templateUrl: './create-parcel.component.html',
  styleUrls: ['./create-parcel.component.css']
})
export class CreateParcelComponent implements OnInit {

  public parcelTypeNames: string[];
  public parcel: Parcel;

  constructor(private router: Router, private parcelManagementService: ParcelManagementService) {}

  ngOnInit() {
    this.parcel = new Parcel();
    this.parcelManagementService.listParcelTypes().subscribe(response => this.parcelTypeNames = response);
  }

  public parcelTypeChanged(selectedType: any): void {
    this.parcel.parcelTypeName = this.parcelTypeNames[selectedType.target.options.selectedIndex - 1];
  }

  public onSubmit(): void {
    this.parcelManagementService
      .createParcel(this.parcel)
      .subscribe(trackingNumber => {
        if (trackingNumber) {
          this.router.navigate(['/track', { trackingNumber: trackingNumber }]);
        }
      });
  }

}
