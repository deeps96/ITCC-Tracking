import {Component, OnInit} from '@angular/core';
import {Parcel, Station} from "../data-objects/parcel-management";
import {ParcelManagementService} from "../services/parcel-management.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HelperMethods} from "../helper-methods";
import {DataManagementService} from "../services/data-management.service";

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.css']
})
export class AddStationComponent implements OnInit {

  public parcel: Parcel;
  public newStation: Station;
  public transportationModes: string[];
  public actionDescriptions: string[];

  constructor(private route: ActivatedRoute,
              private parcelManagementService: ParcelManagementService,
              private dataManagementService: DataManagementService) {}

  ngOnInit() {
    this.dataManagementService.listTransportationModes().subscribe(response => this.transportationModes = response);
    this.dataManagementService.listActionDescriptions().subscribe(response => this.actionDescriptions = response);
    this.updateParcel();
    this.newStation = new Station();
  }

  public addStation(station: Station): void {
    let success: boolean = true;
    this.parcelManagementService.addStation(this.parcel.trackingNumber, station)
      .catch(error => { success = false; return error}).subscribe(response => {
      if (success) {
        this.updateParcel();
        this.newStation = new Station();
      }
    });
  }

  public actionChanged(selectedAction: any): void {
      this.newStation.actionDescription = this.actionDescriptions[selectedAction.target.options.selectedIndex - 1];
  }

  public transportChanged(selectedTransport: any): void {
      this.newStation.transportationMode = this.transportationModes[selectedTransport.target.options.selectedIndex - 1];
  }

  public convertToDate(timestamp: number) {
    return new Date(timestamp);
  }

  public parseActionDescription(station: Station): string {
    return HelperMethods.parseActionDescription(this.parcel, station);
  }

  //actions
  private updateParcel(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.parcelManagementService.getParcel(params.get('trackingNumber')))
      .subscribe(parcel => {
        this.parcel = parcel;
      });
  }

}
