import {Component, EventEmitter, OnInit} from '@angular/core';
import {MaterializeAction} from "angular2-materialize";
import {DataManagementService} from "../services/data-management.service";

@Component({
  selector: 'app-parcel-type',
  templateUrl: './parcel-type.component.html',
  styleUrls: ['./parcel-type.component.css']
})
export class ParcelTypeComponent implements OnInit {

  public newParcelTypeName: string;
  public newParcelTypeKey: string;
  public parcelTypes: string[] = [];
  public delParcelType: string;
  public newParcelTypeModalActions = new EventEmitter<string|MaterializeAction>();
  public deleteParcelTypeModalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private dataManagementService: DataManagementService) { }

  ngOnInit() {
    this.updateParcelTypes();
    this.newParcelTypeName = "";
    this.newParcelTypeKey = "";
  }

  public openDeleteParcelTypeModal(parcelType: string): void {
    this.delParcelType = parcelType;
    this.deleteParcelTypeModalActions.emit({action: "modal", params: [ 'open' ]});
  }

  public openNewParcelTypeModal(): void {
    this.newParcelTypeModalActions.emit({action: "modal", params: [ 'open' ]});
  }

  public addParcelType(parcelTypeName: string, parcelTypeKey: string): void {
    this.dataManagementService.addParcelType(parcelTypeName, parcelTypeKey).subscribe(response => {
      this.updateParcelTypes();
      this.newParcelTypeName = "";
      this.newParcelTypeKey = "";
    });
  }

  public deleteParcelType(type: string): void {
    this.dataManagementService.removeParcelType(type).subscribe(response => this.updateParcelTypes());
  }

  //actions
  private updateParcelTypes(): void {
    this.dataManagementService.listParcelTypes().subscribe(response => this.parcelTypes = response);
  }
}
