import {Response} from "@angular/http";

declare var Materialize: any;

export class HelperMethods {
  static extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  static handleError(error: any) {
    let errMsg = (error.message) ? error.message : (error._body) ? JSON.parse(error._body).message : 'Server error';
    console.error(error);
    Materialize.toast(errMsg, 3000, "");
    return [];
  }
}
