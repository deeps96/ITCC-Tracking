import {Component, EventEmitter, OnInit} from '@angular/core';
import {StaffMember} from "../data-objects/authorization";
import {AuthorizationService} from "../services/authorization.service";
import {MaterializeAction} from "angular2-materialize";
import {HelperMethods} from "../helper-methods";
import {StaffManagementService} from "../services/staff-management.service";

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})
export class StaffManagementComponent implements OnInit {

  public newStaffModalActions = new EventEmitter<string|MaterializeAction>();
  public deleteStaffModalActions = new EventEmitter<string|MaterializeAction>();
  public staffMembers: StaffMember[];
  public newStaffMember: StaffMember;
  public deleteStaffMember: StaffMember;

  constructor(private staffManagementService: StaffManagementService) { }

  ngOnInit() {
    this.updateStaffMembers();
    this.generateNewStaffmember();
  }

  public openNewStaffModal(): void {
    this.newStaffModalActions.emit({action: "modal", params: [ 'open' ]});
  }

  public openDeleteStaffModal(staffMember: StaffMember): void {
    this.deleteStaffMember = staffMember;
    this.deleteStaffModalActions.emit({action: "modal", params: [ 'open' ]});
  }

  public addStaff(staffMember: StaffMember): void {
    let success: boolean = true;
    this.staffManagementService.addStaffMember(staffMember)
      .catch(error => { success = false; return error}).subscribe(response => {
        if (success) {
          this.updateStaffMembers();
          this.generateNewStaffmember();
        }
      });
  }

  public deleteStaff(id: string): void {
    this.staffManagementService.deleteStaffMember(id).subscribe(response => this.updateStaffMembers());
  }

  //actions
  private updateStaffMembers(): void {
    this.staffManagementService.listStaff().subscribe(response => this.staffMembers = response);
  }

  private generateNewStaffmember(): void {
    this.newStaffMember = new StaffMember();
    this.newStaffMember.password = HelperMethods.generateInitialPassword();
  }
}
