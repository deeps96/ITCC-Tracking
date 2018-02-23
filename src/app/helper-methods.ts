import {Response} from "@angular/http";
import {AuthorizationService} from "./services/authorization.service";
import {Parcel, Station} from "./data-objects/parcel-management";

declare var Materialize: any;

export class HelperMethods {

  constructor(private authorizationService: AuthorizationService) {}

  public static extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  public handleError(error: any) {
    let errMsg = (error.message) ? error.message : (error._body) ? JSON.parse(error._body).message : 'Server error';
    console.error(error);
    if (errMsg == 'Authorization token expired') {
      this.authorizationService.logout();
    }
    Materialize.toast(errMsg, 3000, "");
    return error;
  }

  public static generateInitialPassword(): string {
    return Math.random().toString(36).slice(-8);
  }

  public static parseActionDescription(parcel: Parcel, station: Station): string {
    let parsedActionDescription: string = station.actionDescription;
    parsedActionDescription = parsedActionDescription.replace("#Location#", station.location.city.name + ', ' + station.location.country);
    parsedActionDescription = parsedActionDescription.replace("#Transport#", station.transportationMode);
    parsedActionDescription = parsedActionDescription.replace("#DeparturePerson#", parcel.departurePersonDetails);
    parsedActionDescription = parsedActionDescription.replace("#DestinationPerson#", parcel.destinationPersonDetails);
    parsedActionDescription = parsedActionDescription.replace("#NoteOrPerson#",
      station.notes ? station.notes : parcel.departurePersonDetails);
    return parsedActionDescription;
  }
}
