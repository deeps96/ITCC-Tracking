import {Component, EventEmitter, OnInit} from '@angular/core';
import {MaterializeAction} from "angular2-materialize";
import {DataManagementService} from "../services/data-management.service";

@Component({
  selector: 'app-transportation-mode',
  templateUrl: './transportation-mode.component.html',
  styleUrls: ['./transportation-mode.component.css']
})
export class TransportationModeComponent implements OnInit {

  public newMode: string;
  public modes: string[] = [];
  public delMode: string;
  public newModeModalActions = new EventEmitter<string | MaterializeAction>();
  public deleteModeModalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private dataManagementService: DataManagementService) {
  }

  ngOnInit() {
    this.updateModes();
    this.newMode = "";
  }

  public openDeleteModeModal(action: string): void {
    this.delMode = action;
    this.deleteModeModalActions.emit({action: "modal", params: ['open']});
  }

  public openNewModeModal(): void {
    this.newModeModalActions.emit({action: "modal", params: ['open']});
  }

  public addMode(action: string): void {
    this.dataManagementService.addTransportationMode(action).subscribe(response => {
      this.updateModes();
      this.newMode = "";
    });
  }

  public deleteMode(action: string): void {
    this.dataManagementService.removeTransportationMode(action).subscribe(response => this.updateModes());
  }

  //actions
  private updateModes(): void {
    this.dataManagementService.listTransportationModes().subscribe(response => this.modes = response);
  }
}
