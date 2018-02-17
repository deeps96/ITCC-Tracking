import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Parcel} from "../parcel-management";
import {ParcelManagementService} from "../parcel-management.service";

@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.component.html',
  styleUrls: ['./parcel-details.component.css']
})
export class ParcelDetailsComponent implements OnInit {

  public parcel: Parcel;

  constructor(private route: ActivatedRoute, private parcelManagementService: ParcelManagementService) { }

  ngOnInit() {
    this.parcel = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.parcelManagementService.getParcel(params.get('trackingNumber')));
  }

}
