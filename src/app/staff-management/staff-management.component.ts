import { Component, OnInit } from '@angular/core';
import {StaffMember} from "../authorization";
import {AuthorizationService} from "../authorization.service";

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})
export class StaffManagementComponent implements OnInit {

  public staffMembers: StaffMember[];

  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.authorizationService.listStaff().subscribe(response => this.staffMembers = response);
  }

}
