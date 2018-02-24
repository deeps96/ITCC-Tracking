import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {AuthorizationService} from "./authorization.service";
import {HelperMethods} from "../helper-methods";
import {Observable} from "rxjs/Rx";
import {ROUTER_CONFIG} from "../../assets/config";
import {RouterConfig} from "../data-objects/config";

@Injectable()
export class DataManagementService {

  private helperMethods: HelperMethods;
  private routerConfig: RouterConfig = ROUTER_CONFIG;


  constructor(private http: Http,
              private authorizationService: AuthorizationService) {
    this.helperMethods = new HelperMethods(authorizationService);
  }

  public listParcelTypes(): Observable<string[]> {
    return this.http.get(this.routerConfig.serverAddress + '/listParcelTypes')
      .map(HelperMethods.extractData)
      .catch(event => this.helperMethods.handleError(event))
      .map(response => response.parcelTypes);
  }

  public listTransportationModes(): Observable<string[]> {
    return this.http.get(this.routerConfig.serverAddress + '/listTransportationModes')
      .map(HelperMethods.extractData)
      .catch(event => this.helperMethods.handleError(event))
      .map(response => response.transportationModes);
  }

  public listActionDescriptions(): Observable<string[]> {
    return this.http.get(this.routerConfig.serverAddress + '/listActionDescriptions')
      .map(HelperMethods.extractData)
      .catch(event => this.helperMethods.handleError(event))
      .map(response => response.actionDescriptions);
  }

  public addTransportationMode(mode: string): Observable<Response> {
    const body = {
      authorizationToken: this.authorizationService.getToken(),
      mode: mode
    };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.routerConfig.serverAddress + '/addTransportationMode', JSON.stringify(body), options)
      .catch(event => this.helperMethods.handleError(event));
  }

  public addActionDescription(actionDescription: string): Observable<Response> {
    const body = {
      authorizationToken: this.authorizationService.getToken(),
      actionDescription: actionDescription
    };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.routerConfig.serverAddress + '/addActionDescription', JSON.stringify(body), options)
      .catch(event => this.helperMethods.handleError(event));
  }

  public addParcelType(type: string, key: string): Observable<Response> {
    const body = {
      authorizationToken: this.authorizationService.getToken(),
      type: type,
      key: key
    };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.routerConfig.serverAddress + '/addParcelType', JSON.stringify(body), options)
      .catch(event => this.helperMethods.handleError(event));
  }

  public removeTransportationMode(mode: string): Observable<Response> {
    const params = {
      authorizationToken: this.authorizationService.getToken(),
      mode: mode
    };
    return this.http.delete(this.routerConfig.serverAddress + '/removeTransportationMode', {params: params})
      .catch(event => this.helperMethods.handleError(event));
  }

  public removeActionDescription(action: string): Observable<Response> {
    const params = {
      authorizationToken: this.authorizationService.getToken(),
      action: action
    };
    return this.http.delete(this.routerConfig.serverAddress + '/removeActionDescription', {params: params})
      .catch(event => this.helperMethods.handleError(event));
  }

  public removeParcelType(type: string): Observable<Response> {
    const params = {
      authorizationToken: this.authorizationService.getToken(),
      type: type
    };
    return this.http.delete(this.routerConfig.serverAddress + '/removeParcelType', {params: params})
      .catch(event => this.helperMethods.handleError(event));
  }
}
