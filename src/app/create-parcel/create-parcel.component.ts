import { Component, OnInit } from '@angular/core';
import {Location, Parcel} from "../data-objects/parcel-management";
import {ParcelManagementService} from "../services/parcel-management.service";
import {Router} from "@angular/router";
import {DataManagementComponent} from "../data-management/data-management.component";
import {DataManagementService} from "../services/data-management.service";

@Component({
  selector: 'app-create-parcel',
  templateUrl: './create-parcel.component.html',
  styleUrls: ['./create-parcel.component.css']
})
export class CreateParcelComponent implements OnInit {

  public parcelTypeNames: string[];
  public parcel: Parcel;

  constructor(private router: Router, private parcelManagementService: ParcelManagementService, private dataManagementService: DataManagementService) {}

  ngOnInit() {
    this.parcel = new Parcel();
    this.dataManagementService.listParcelTypes().subscribe(response => this.parcelTypeNames = response);
  }

  public parcelTypeChanged(selectedType: any): void {
    this.parcel.parcelTypeName = this.parcelTypeNames[selectedType.target.options.selectedIndex - 1];
  }

  public onSubmit(): void {
    this.parcelManagementService
      .createParcel(this.parcel)
      .subscribe(trackingNumber => {
        if (trackingNumber) {
          this.router.navigate(['track', trackingNumber]);
        }
      });
  }

}
