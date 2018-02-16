import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {RouterConfig} from "./config";
import {ROUTER_CONFIG} from "../assets/config";
import {Observable} from "rxjs/Rx";
import {StaffMember} from "./authorization";
import {HelperMethods} from "./helper-methods";
import {AuthorizationService} from "./authorization.service";

@Injectable()
export class StaffManagementService {

  private routerConfig: RouterConfig = ROUTER_CONFIG;

  constructor(private http: Http, private authorizationService: AuthorizationService) { }

  public listStaff(): Observable<StaffMember[]> {
    const params = {
      authorizationToken: this.authorizationService.getToken()
    };
    return this.http.get(this.routerConfig.serverAddress + '/listStaff', {params: params})
      .map(HelperMethods.extractData)
      .catch(HelperMethods.handleError)
      .map(response => response.staffMembers);
  }

  public deleteStaffMember(id: string): Observable<any> {
    const params = {
      authorizationToken: this.authorizationService.getToken(),
      staffID: id
    };
    return this.http.delete(this.routerConfig.serverAddress + '/removeStaff', {params: params})
      .catch(HelperMethods.handleError);
  }

}
