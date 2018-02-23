import {Component, EventEmitter, OnInit} from '@angular/core';
import {MaterializeAction} from "angular2-materialize";
import {DataManagementService} from "../services/data-management.service";

@Component({
  selector: 'app-action-description',
  templateUrl: './action-description.component.html',
  styleUrls: ['./action-description.component.css']
})
export class ActionDescriptionComponent implements OnInit {

  public newAction: string;
  public actions: string[] = [];
  public delAction: string;
  public newActionModalActions = new EventEmitter<string|MaterializeAction>();
  public deleteActionModalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private dataManagementService: DataManagementService) { }

  ngOnInit() {
    this.updateActions();
    this.newAction = "";
  }

  public openDeleteActionModal(action: string): void {
    this.delAction = action;
    this.deleteActionModalActions.emit({action: "modal", params: [ 'open' ]});
  }

  public openNewActionModal(): void {
    this.newActionModalActions.emit({action: "modal", params: [ 'open' ]});
  }

  public addAction(action: string): void {
    this.dataManagementService.addActionDescription(action).subscribe(response => {
      this.updateActions();
      this.newAction = "";
    });
  }

  public deleteAction(action: string): void {
    this.dataManagementService.removeActionDescription(action).subscribe(response => this.updateActions());
  }

  //actions
  private updateActions(): void {
    this.dataManagementService.listActionDescriptions().subscribe(response => this.actions = response);
  }

}
