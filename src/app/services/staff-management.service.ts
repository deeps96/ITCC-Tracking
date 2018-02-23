import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {RouterConfig} from "./config";
import {ROUTER_CONFIG} from "../assets/config";
import {Observable} from "rxjs/Rx";
import {StaffMember} from "./authorization";
import {HelperMethods} from "./helper-methods";
import {AuthorizationService} from "./authorization.service";

@Injectable()
export class StaffManagementService {

  private helperMethods: HelperMethods;
  private routerConfig: RouterConfig = ROUTER_CONFIG;

  constructor(private http: Http, private authorizationService: AuthorizationService) {
    this.helperMethods = new HelperMethods(authorizationService);
  }

  public listStaff(): Observable<StaffMember[]> {
    const params = {
      authorizationToken: this.authorizationService.getToken()
    };
    return this.http.get(this.routerConfig.serverAddress + '/listStaff', {params: params})
      .map(HelperMethods.extractData)
      .catch(event => this.helperMethods.handleError(event))
      .map(response => response.staffMembers);
  }

  public deleteStaffMember(id: string): Observable<any> {
    const params = {
      authorizationToken: this.authorizationService.getToken(),
      staffID: id
    };
    return this.http.delete(this.routerConfig.serverAddress + '/removeStaff', {params: params})
      .catch(event => this.helperMethods.handleError(event));
  }

  public addStaffMember(staffMember: StaffMember): Observable<Response> {
    staffMember.password = AuthorizationService.hashPassword(staffMember.password);
    const body = {
      authorizationToken: this.authorizationService.getToken(),
      staffMember: staffMember
    };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.routerConfig.serverAddress + '/addStaff', JSON.stringify(body), options)
      .catch(event => this.helperMethods.handleError(event));
  }

}
