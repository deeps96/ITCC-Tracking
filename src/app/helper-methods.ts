import {Response} from "@angular/http";

declare var Materialize: any;

export class HelperMethods {
  static extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  static handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    Materialize.toast(errMsg, 3000, "");
    return [];
  }
}
