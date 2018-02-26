webpackJsonp(["main"],{

/***/ "./src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_gendir lazy recursive";

/***/ }),

/***/ "./src/app/action-description/action-description.component.css":
/***/ (function(module, exports) {

module.exports = ".container {\r\n  padding: 20px;\r\n}\r\n\r\n.deleteIcon {\r\n  cursor: pointer;\r\n}\r\n"

/***/ }),

/***/ "./src/app/action-description/action-description.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col s12\">\n    <h1 class=\"center-align\">Action descriptions</h1>\n  </div>\n</div>\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col s12\">\n      <table>\n        <thead>\n        <tr>\n          <th>Actions</th>\n          <th class=\"center-align\">Delete</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr *ngFor=\"let action of actions\">\n          <td>{{action}}</td>\n          <td class=\"center\">\n            <a materialize=\"tooltip\" class=\"modal-trigger tooltipped\" (click)=\"openDeleteActionModal(action)\" href=\"#deleteActionModal\"\n               data-delay=\"50\" data-tooltip=\"Delete action description\" data-position=\"bottom\">\n              <i class=\"material-icons deleteIcon blue-grey-text\">delete</i>\n            </a>\n          </td>\n        </tr>\n        <tr *ngIf=\"actions && actions.length == 0\">\n          <td colspan=\"4\" class=\"center\">No action description in database!</td>\n        </tr>\n        <tr>\n          <td>\n            <a materialize=\"tooltip\" class=\"btn-floating waves-effect waves-light blue-grey tooltipped modal-trigger\"\n               data-delay=\"50\" data-tooltip=\"Add an action description\" data-position=\"right\" (click)=\"openNewActionModal()\" href=\"#addActionModal\">\n              <i class=\"material-icons\">add</i>\n            </a>\n          </td>\n        </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n<!-- Delete action modal -->\n<div id=\"deleteActionModal\" class=\"modal bottom-sheet blue-grey lighten-5\" materialize=\"modal\" [materializeParams]=\"[{dismissible: true}]\" [materializeActions]=\"deleteActionModalActions\">\n  <div class=\"modal-content\">\n    <h4>Are you sure, that you want to delete the action description?</h4>\n    <p *ngIf=\"delAction\">{{delAction}} can´t get selected anymore if you proceed.</p>\n  </div>\n  <div class=\"modal-footer blue-grey lighten-5\">\n    <a class=\"modal-action modal-close btn-flat\">Abort</a>\n    <a class=\"modal-action modal-close waves-effect waves-red waves-darken-3 btn-flat\" (click)=\"deleteAction(delAction);\">Proceed</a>\n  </div>\n</div>\n\n<!-- Add action modal -->\n<div id=\"addActionModal\" class=\"modal blue-grey lighten-5\" materialize=\"modal\" [materializeParams]=\"[{dismissible: false}]\" [materializeActions]=\"newActionModalActions\">\n  <div class=\"modal-content\">\n    <a class=\"modal-action modal-close waves-effect waves-red waves-darken-3 btn-flat\">\n      <i class=\"material-icons blue-grey-text\">cancel</i>\n    </a>\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h4 class=\"center-align\">Add a new action description</h4>\n        </div>\n      </div>\n      <form>\n        <div class=\"row\">\n          <p>\n            The action description can contain #Location# #Transport# #DestinationPerson# #DeparturePerson# and #NoteOrPerson#\n            Refer to <a href=\"https://github.com/deeps96/ITCC-Tracking/issues/27#issuecomment-366525246\">Link</a> for more details.\n          </p>\n        </div>\n        <div class=\"row no-margin\">\n          <div class=\"input-field col s12\">\n            <input id=\"action\" type=\"text\" class=\"validate\" name=\"action\" [(ngModel)]=\"newAction\" required>\n            <label for=\"action\">Action description</label>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n  <div class=\"modal-footer blue-grey lighten-5\">\n    <a class=\"waves-effect modal-action modal-close waves-green waves-darken-3 btn-flat\" (click)=\"addAction(newAction);\">Add action description</a>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/action-description/action-description.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionDescriptionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_data_management_service__ = __webpack_require__("./src/app/services/data-management.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ActionDescriptionComponent = (function () {
    function ActionDescriptionComponent(dataManagementService) {
        this.dataManagementService = dataManagementService;
        this.actions = [];
        this.newActionModalActions = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.deleteActionModalActions = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    ActionDescriptionComponent.prototype.ngOnInit = function () {
        this.updateActions();
        this.newAction = "";
    };
    ActionDescriptionComponent.prototype.openDeleteActionModal = function (action) {
        this.delAction = action;
        this.deleteActionModalActions.emit({ action: "modal", params: ['open'] });
    };
    ActionDescriptionComponent.prototype.openNewActionModal = function () {
        this.newActionModalActions.emit({ action: "modal", params: ['open'] });
    };
    ActionDescriptionComponent.prototype.addAction = function (action) {
        var _this = this;
        this.dataManagementService.addActionDescription(action).subscribe(function (response) {
            _this.updateActions();
            _this.newAction = "";
        });
    };
    ActionDescriptionComponent.prototype.deleteAction = function (action) {
        var _this = this;
        this.dataManagementService.removeActionDescription(action).subscribe(function (response) { return _this.updateActions(); });
    };
    //actions
    ActionDescriptionComponent.prototype.updateActions = function () {
        var _this = this;
        this.dataManagementService.listActionDescriptions().subscribe(function (response) { return _this.actions = response; });
    };
    return ActionDescriptionComponent;
}());
ActionDescriptionComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-action-description',
        template: __webpack_require__("./src/app/action-description/action-description.component.html"),
        styles: [__webpack_require__("./src/app/action-description/action-description.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_data_management_service__["a" /* DataManagementService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_data_management_service__["a" /* DataManagementService */]) === "function" && _a || Object])
], ActionDescriptionComponent);

var _a;
//# sourceMappingURL=action-description.component.js.map

/***/ }),

/***/ "./src/app/add-station/add-station.component.css":
/***/ (function(module, exports) {

module.exports = "#background {\r\n  min-height: 100vh;\r\n  min-width: 100vw;\r\n  padding-top: 100px;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n.stationNumber {\r\n  margin-right: 10px;\r\n  padding: 0 10px;\r\n  line-height: 30px;\r\n  border-radius: 50%;\r\n  background-color: #607d8b;\r\n  color: #eceff1;\r\n}\r\n\r\n#addStationForm {\r\n  margin-bottom: 50px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/add-station/add-station.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"background\" class=\"blue-grey lighten-5\">\r\n  <div class=\"container white z-depth-1\">\r\n    <div class=\"row\">\r\n      <div class=\"col s12\">\r\n        <h1 class=\"center-align\">Parcel management</h1>\r\n      </div>\r\n    </div>\r\n    <div class=\"container\" *ngIf=\"parcel\">\r\n      <div class=\"row\">\r\n        <div class=\"col s12\">\r\n          <ul materialize=\"collapsible\" class=\"collapsible\" data-collapsible=\"expandable\">\r\n            <li>\r\n              <div class=\"collapsible-header\"><i class=\"material-icons\">receipt</i>General information</div>\r\n              <div class=\"collapsible-body\">\r\n                <table>\r\n                  <tbody>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">Tracking number:</td>\r\n                    <td class=\"no-padding blue-grey-text\">{{parcel.trackingNumber}}</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">Handover:</td>\r\n                    <td class=\"no-padding\">{{convertToDate(parcel.handOverTimestamp)}}</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">Parcel type:</td>\r\n                    <td class=\"no-padding\">{{parcel.parcelTypeName}}</td>\r\n                  </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n            </li>\r\n            <li>\r\n              <div class=\"collapsible-header\"><i class=\"material-icons\">location_city</i>Departure</div>\r\n              <div class=\"collapsible-body\">\r\n                <table>\r\n                  <tbody>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">Person details:</td>\r\n                    <td class=\"no-padding\">{{parcel.departurePersonDetails}}</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">Road:</td>\r\n                    <td class=\"no-padding\">{{parcel.departure.road}}</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">City:</td>\r\n                    <td class=\"no-padding\">{{parcel.departure.city.name}}</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">Country:</td>\r\n                    <td class=\"no-padding\">{{parcel.departure.country}}</td>\r\n                  </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n            </li>\r\n            <li>\r\n              <div class=\"collapsible-header\"><i class=\"material-icons\">location_searching</i>Destination</div>\r\n              <div class=\"collapsible-body\">\r\n                <table>\r\n                  <tbody>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">Person details:</td>\r\n                    <td class=\"no-padding\">{{parcel.destinationPersonDetails}}</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">Road:</td>\r\n                    <td class=\"no-padding\">{{parcel.destination.road}}</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">City:</td>\r\n                    <td class=\"no-padding\">{{parcel.destination.city.name}}</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">Country:</td>\r\n                    <td class=\"no-padding\">{{parcel.destination.country}}</td>\r\n                  </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col s12 center\">\r\n          <h3>Stations</h3>\r\n          <ul materialize=\"collapsible\" class=\"collapsible\" data-collapsible=\"expandable\">\r\n            <li *ngFor=\"let station of parcel.stations; let iStation = index;\">\r\n              <div class=\"collapsible-header valign-wrapper\">\r\n                <span class=\"stationNumber\">{{iStation + 1}}</span> {{parseActionDescription(station)}}\r\n              </div>\r\n              <div class=\"collapsible-body\">\r\n                <table>\r\n                  <tbody>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">Timestamp:</td>\r\n                    <td class=\"no-padding\">{{station.timestamp}}</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">Transportation mode:</td>\r\n                    <td class=\"no-padding\">{{station.transportationMode}}</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">Notes:</td>\r\n                    <td class=\"no-padding\">\r\n                      <ng-container *ngIf=\"station.notes && station.notes.length > 0\">{{station.notes}}</ng-container>\r\n                      <ng-container *ngIf=\"!station.notes || station.notes.length == 0\">-</ng-container>\r\n                    </td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">Road:</td>\r\n                    <td class=\"no-padding\">{{station.location.road}}</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">City:</td>\r\n                    <td class=\"no-padding\">{{station.location.city.name}}</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td class=\"bold-text no-padding\">Country:</td>\r\n                    <td class=\"no-padding\">{{station.location.country}}</td>\r\n                  </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col s12\">\r\n          <h4 class=\"center-align\">Add a new station</h4>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col s12\">\r\n          <form id=\"addStationForm\" (ngSubmit)=\"addStation(newStation);\">\r\n            <div class=\"row\">\r\n              <div class=\"input-field col s8 offset-s2\">\r\n                <select id=\"actionSelect\" materialize=\"material_select\" [materializeSelectOptions]=\"actionDescriptions\" (change)=\"actionChanged($event)\" class=\"validate\" required>\r\n                  <option value=\"\" disabled selected>Choose the action for the station</option>\r\n                  <option *ngFor=\"let action of actionDescriptions\" [value]=\"action\">{{action}}</option>\r\n                </select>\r\n                <label for=\"actionSelect\">Action description</label>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"input-field col s8 offset-s2\">\r\n                <select id=\"transportSelect\" materialize=\"material_select\" [materializeSelectOptions]=\"transportationModes\" (change)=\"transportChanged($event)\" class=\"validate\" required>\r\n                  <option value=\"\" disabled selected>Choose the transport for the station</option>\r\n                  <option *ngFor=\"let transport of transportationModes\" [value]=\"transport\">{{transport}}</option>\r\n                </select>\r\n                <label for=\"transportSelect\">Transportation mode</label>\r\n              </div>\r\n            </div>\r\n            <div class=\"row no-margin\">\r\n              <div class=\"input-field col s12\">\r\n                <input id=\"road\" type=\"text\" class=\"validate\" name=\"road\" [(ngModel)]=\"newStation.location.road\" required>\r\n                <label for=\"road\">Road</label>\r\n              </div>\r\n            </div>\r\n            <div class=\"row no-margin\">\r\n              <div class=\"input-field col s9\">\r\n                <input id=\"cityName\" type=\"text\" class=\"validate\" name=\"cityName\" [(ngModel)]=\"newStation.location.city.name\" required>\r\n                <label for=\"cityName\">City</label>\r\n              </div>\r\n              <div class=\"input-field col s3\">\r\n                <input id=\"zipCode\" type=\"text\" class=\"validate\" name=\"zipyCode\" [(ngModel)]=\"newStation.location.city.zipCode\" required>\r\n                <label for=\"zipCode\">ZIP</label>\r\n              </div>\r\n            </div>\r\n            <div class=\"row no-margin\">\r\n              <div class=\"input-field col s12\">\r\n                <input id=\"country\" type=\"text\" class=\"validate\" name=\"country\" [(ngModel)]=\"newStation.location.country\" required>\r\n                <label for=\"country\">Country</label>\r\n              </div>\r\n            </div>\r\n            <div class=\"row no-margin\">\r\n              <div class=\"col s12\">\r\n                <button class=\"btn waves-effect waves-light right\" type=\"submit\" name=\"action\">Add station\r\n                  <i class=\"material-icons right\">add_to_photos</i>\r\n                </button>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/add-station/add-station.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddStationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_objects_parcel_management__ = __webpack_require__("./src/app/data-objects/parcel-management.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_parcel_management_service__ = __webpack_require__("./src/app/services/parcel-management.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_methods__ = __webpack_require__("./src/app/helper-methods.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_data_management_service__ = __webpack_require__("./src/app/services/data-management.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddStationComponent = (function () {
    function AddStationComponent(route, parcelManagementService, dataManagementService) {
        this.route = route;
        this.parcelManagementService = parcelManagementService;
        this.dataManagementService = dataManagementService;
    }
    AddStationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataManagementService.listTransportationModes().subscribe(function (response) { return _this.transportationModes = response; });
        this.dataManagementService.listActionDescriptions().subscribe(function (response) { return _this.actionDescriptions = response; });
        this.updateParcel();
        this.newStation = new __WEBPACK_IMPORTED_MODULE_1__data_objects_parcel_management__["b" /* Station */]();
    };
    AddStationComponent.prototype.addStation = function (station) {
        var _this = this;
        var success = true;
        this.parcelManagementService.addStation(this.parcel.trackingNumber, station)
            .catch(function (error) { success = false; return error; }).subscribe(function (response) {
            if (success) {
                _this.updateParcel();
                _this.newStation = new __WEBPACK_IMPORTED_MODULE_1__data_objects_parcel_management__["b" /* Station */]();
            }
        });
    };
    AddStationComponent.prototype.actionChanged = function (selectedAction) {
        this.newStation.actionDescription = this.actionDescriptions[selectedAction.target.options.selectedIndex - 1];
    };
    AddStationComponent.prototype.transportChanged = function (selectedTransport) {
        this.newStation.transportationMode = this.transportationModes[selectedTransport.target.options.selectedIndex - 1];
    };
    AddStationComponent.prototype.convertToDate = function (timestamp) {
        return new Date(timestamp);
    };
    AddStationComponent.prototype.parseActionDescription = function (station) {
        return __WEBPACK_IMPORTED_MODULE_4__helper_methods__["a" /* HelperMethods */].parseActionDescription(this.parcel, station);
    };
    //actions
    AddStationComponent.prototype.updateParcel = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) {
            return _this.parcelManagementService.getParcel(params.get('trackingNumber'));
        })
            .subscribe(function (parcel) {
            _this.parcel = parcel;
        });
    };
    return AddStationComponent;
}());
AddStationComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-add-station',
        template: __webpack_require__("./src/app/add-station/add-station.component.html"),
        styles: [__webpack_require__("./src/app/add-station/add-station.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_parcel_management_service__["a" /* ParcelManagementService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_parcel_management_service__["a" /* ParcelManagementService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_data_management_service__["a" /* DataManagementService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_data_management_service__["a" /* DataManagementService */]) === "function" && _c || Object])
], AddStationComponent);

var _a, _b, _c;
//# sourceMappingURL=add-station.component.js.map

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ".nav-wrapper ul {\r\n  margin-right: 20px;\r\n}\r\n\r\nnav {\r\n  position: absolute;\r\n  z-index: 1;\r\n}\r\n\r\n#backendNotRunning {\r\n  height: 100vh;\r\n  width: 100vw;\r\n  text-align: center;\r\n  vertical-align: middle;\r\n  line-height: 100vh;\r\n}\r\n\r\n#loading {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  height: 100vh;\r\n  width: 100vw;\r\n}\r\n"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"!showLoading && backendRunning\">\r\n  <nav class=\"transparent z-depth-0\" *ngIf=\"showNav\">\r\n    <div class=\"nav-wrapper\">\r\n      <ul class=\"right\">\r\n        <li *ngIf=\"showAdminButtons\"><a [routerLink]=\"['/staff']\" class=\"light-blue-text text-lighten-3\">Staff</a></li>\r\n        <li *ngIf=\"showAdminButtons\"><a [routerLink]=\"['/data']\" class=\"light-blue-text text-lighten-3\">Data</a></li>\r\n        <li *ngIf=\"showLoginButton\"><a [routerLink]=\"['/login']\" class=\"light-blue-text text-lighten-3\">Login</a></li>\r\n        <li *ngIf=\"showLogoutButton\"><a (click)=\"logout();\" class=\"light-blue-text text-lighten-3\">Logout</a></li>\r\n      </ul>\r\n    </div>\r\n  </nav>\r\n  <router-outlet></router-outlet>\r\n</ng-container>\r\n<ng-container *ngIf=\"!showLoading && !backendRunning\">\r\n  <h1 id=\"backendNotRunning\" class=\"red-text text-darken-3 blue-grey lighten-5 no-margin\">The backend is not running</h1>\r\n</ng-container>\r\n<ng-container *ngIf=\"showLoading\">\r\n <div id=\"loading\">\r\n   <div class=\"preloader-wrapper big active\">\r\n     <div class=\"spinner-layer spinner-blue\">\r\n       <div class=\"circle-clipper left\">\r\n         <div class=\"circle\"></div>\r\n       </div><div class=\"gap-patch\">\r\n       <div class=\"circle\"></div>\r\n     </div><div class=\"circle-clipper right\">\r\n       <div class=\"circle\"></div>\r\n     </div>\r\n     </div>\r\n\r\n     <div class=\"spinner-layer spinner-red\">\r\n       <div class=\"circle-clipper left\">\r\n         <div class=\"circle\"></div>\r\n       </div><div class=\"gap-patch\">\r\n       <div class=\"circle\"></div>\r\n     </div><div class=\"circle-clipper right\">\r\n       <div class=\"circle\"></div>\r\n     </div>\r\n     </div>\r\n\r\n     <div class=\"spinner-layer spinner-yellow\">\r\n       <div class=\"circle-clipper left\">\r\n         <div class=\"circle\"></div>\r\n       </div><div class=\"gap-patch\">\r\n       <div class=\"circle\"></div>\r\n     </div><div class=\"circle-clipper right\">\r\n       <div class=\"circle\"></div>\r\n     </div>\r\n     </div>\r\n\r\n     <div class=\"spinner-layer spinner-green\">\r\n       <div class=\"circle-clipper left\">\r\n         <div class=\"circle\"></div>\r\n       </div><div class=\"gap-patch\">\r\n       <div class=\"circle\"></div>\r\n     </div><div class=\"circle-clipper right\">\r\n       <div class=\"circle\"></div>\r\n     </div>\r\n     </div>\r\n   </div>\r\n </div>\r\n</ng-container>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_authorization_service__ = __webpack_require__("./src/app/services/authorization.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/timeout.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = AppComponent_1 = (function () {
    function AppComponent(router, authenticationService) {
        var _this = this;
        this.router = router;
        this.authenticationService = authenticationService;
        this.showLoading = true;
        this.backendRunning = true;
        router.events
            .filter(function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationStart */]; })
            .subscribe(function (event) { return _this.updateButtonVisibilities(event); });
        this.showPreloader();
    }
    //actions
    AppComponent.isParcelDetailPage = function (event) {
        return event.url.startsWith('/track');
    };
    AppComponent.isLoginPage = function (event) {
        return event.url.startsWith('/login');
    };
    AppComponent.prototype.isLoggedIn = function () {
        return this.authenticationService.isAuthenticated();
    };
    AppComponent.prototype.logout = function () {
        this.authenticationService.logout();
        this.showLoginButton = true;
        this.showLogoutButton = false;
        this.showStaffButtons = false;
        this.showAdminButtons = false;
        this.routeToIndex();
        Materialize.toast("Successfully logged out.", 3000, "");
    };
    AppComponent.prototype.routeToIndex = function () {
        this.router.navigate(['']);
    };
    AppComponent.prototype.updateButtonVisibilities = function (event) {
        var _this = this;
        this.showLoginButton = !AppComponent_1.isLoginPage(event) && !this.isLoggedIn();
        this.showLogoutButton = !AppComponent_1.isLoginPage(event) && this.isLoggedIn();
        this.showNav = !AppComponent_1.isParcelDetailPage(event);
        if (this.isLoggedIn()) {
            this.authenticationService.isAdmin().subscribe(function (isAdmin) { return _this.showAdminButtons = isAdmin; });
            this.authenticationService.isStaff().subscribe(function (isStaff) { return _this.showStaffButtons = isStaff; });
        }
    };
    AppComponent.prototype.showPreloader = function () {
        var _this = this;
        this.authenticationService.isBackendRunning()
            .timeout(3000)
            .catch(function (error) {
            _this.backendRunning = false;
            _this.showLoading = false;
            return [];
        }).subscribe(function (response) { return _this.showLoading = false; });
    };
    return AppComponent;
}());
AppComponent = AppComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("./src/app/app.component.html"),
        styles: [__webpack_require__("./src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_authorization_service__["a" /* AuthorizationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_authorization_service__["a" /* AuthorizationService */]) === "function" && _b || Object])
], AppComponent);

var AppComponent_1, _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_materialize__ = __webpack_require__("./node_modules/angular2-materialize/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routing_app_routes__ = __webpack_require__("./src/app/routing/app.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login_component__ = __webpack_require__("./src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_cookie__ = __webpack_require__("./node_modules/ngx-cookie/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_authorization_service__ = __webpack_require__("./src/app/services/authorization.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__home_home_component__ = __webpack_require__("./src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__create_parcel_create_parcel_component__ = __webpack_require__("./src/app/create-parcel/create-parcel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_parcel_management_service__ = __webpack_require__("./src/app/services/parcel-management.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__staff_management_staff_management_component__ = __webpack_require__("./src/app/staff-management/staff-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__routing_auth_guard__ = __webpack_require__("./src/app/routing/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_staff_management_service__ = __webpack_require__("./src/app/services/staff-management.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__parcel_details_parcel_details_component__ = __webpack_require__("./src/app/parcel-details/parcel-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ngui_map__ = __webpack_require__("./node_modules/@ngui/map/dist/@ngui/map.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular_vertical_timeline__ = __webpack_require__("./node_modules/angular-vertical-timeline/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__data_management_data_management_component__ = __webpack_require__("./src/app/data-management/data-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_data_management_service__ = __webpack_require__("./src/app/services/data-management.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__parcel_type_parcel_type_component__ = __webpack_require__("./src/app/parcel-type/parcel-type.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__action_description_action_description_component__ = __webpack_require__("./src/app/action-description/action-description.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__transportation_mode_transportation_mode_component__ = __webpack_require__("./src/app/transportation-mode/transportation-mode.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__add_station_add_station_component__ = __webpack_require__("./src/app/add-station/add-station.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_10__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_11__create_parcel_create_parcel_component__["a" /* CreateParcelComponent */],
            __WEBPACK_IMPORTED_MODULE_13__staff_management_staff_management_component__["a" /* StaffManagementComponent */],
            __WEBPACK_IMPORTED_MODULE_16__parcel_details_parcel_details_component__["a" /* ParcelDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_19__data_management_data_management_component__["a" /* DataManagementComponent */],
            __WEBPACK_IMPORTED_MODULE_21__parcel_type_parcel_type_component__["a" /* ParcelTypeComponent */],
            __WEBPACK_IMPORTED_MODULE_22__action_description_action_description_component__["a" /* ActionDescriptionComponent */],
            __WEBPACK_IMPORTED_MODULE_23__transportation_mode_transportation_mode_component__["a" /* TransportationModeComponent */],
            __WEBPACK_IMPORTED_MODULE_24__add_station_add_station_component__["a" /* AddStationComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_7_ngx_cookie__["a" /* CookieModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_9__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3_angular2_materialize__["a" /* MaterializeModule */],
            __WEBPACK_IMPORTED_MODULE_4__routing_app_routes__["a" /* AppRoutesModule */],
            __WEBPACK_IMPORTED_MODULE_17__ngui_map__["a" /* NguiMapModule */].forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCQLhnDxhB2Gb7CRWLlZvWcYdEqK0GqseI' }),
            __WEBPACK_IMPORTED_MODULE_18_angular_vertical_timeline__["a" /* VerticalTimelineModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_8__services_authorization_service__["a" /* AuthorizationService */],
            __WEBPACK_IMPORTED_MODULE_14__routing_auth_guard__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_20__services_data_management_service__["a" /* DataManagementService */],
            __WEBPACK_IMPORTED_MODULE_12__services_parcel_management_service__["a" /* ParcelManagementService */],
            __WEBPACK_IMPORTED_MODULE_15__services_staff_management_service__["a" /* StaffManagementService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "./src/app/create-parcel/create-parcel.component.css":
/***/ (function(module, exports) {

module.exports = "#createNewParcelWrapper {\r\n  width: 100vw;\r\n  height: 100vh;\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n}\r\n\r\n#container {\r\n  width: 1000px;\r\n}\r\n\r\n.card-panel {\r\n  padding: 10px 30px;\r\n}\r\n\r\n#parcelImage {\r\n  width: 100px;\r\n  height: 100px;\r\n  margin-bottom: 30px;\r\n}\r\n\r\n#submitButton {\r\n  background-color: #6699CC;\r\n}\r\n"

/***/ }),

/***/ "./src/app/create-parcel/create-parcel.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"createNewParcelWrapper\">\r\n  <div class=\"row\" id=\"container\">\r\n    <div class=\"col s12 card-panel z-depth-2 blue-grey lighten-5 center\">\r\n      <form (ngSubmit)=\"onSubmit()\">\r\n        <div class=\"row\">\r\n          <div class=\"col s12\">\r\n            <h2 class=\"center-align blue-grey-text\">Create a new parcel</h2>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col s12 center\">\r\n            <img id=\"parcelImage\" src=\"../../assets/images/new-parcel.png\">\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"input-field col s8 offset-s2\">\r\n            <select id=\"parcelTypeSelect\" materialize=\"material_select\" [materializeSelectOptions]=\"parcelTypeNames\" (change)=\"parcelTypeChanged($event)\" class=\"validate\" required>\r\n              <option value=\"\" disabled selected>Choose the type of your parcel</option>\r\n              <option *ngFor=\"let parcelTypeName of parcelTypeNames\" [value]=\"parcelTypeName\">{{parcelTypeName}}</option>\r\n            </select>\r\n            <label for=\"parcelTypeSelect\">Parcel type</label>\r\n          </div>\r\n        </div>\r\n        <div class=\"row valign-wrapper\">\r\n          <div class=\"col s5\">\r\n            <div class=\"row no-margin\">\r\n              <div class=\"input-field col s12\">\r\n                <p class=\"center-align\">Departure</p>\r\n              </div>\r\n            </div>\r\n            <div class=\"row no-margin\">\r\n              <div class=\"input-field col s12\">\r\n                <input id=\"departurePerson\" type=\"text\" class=\"validate\" name=\"departurePerson\" [(ngModel)]=\"parcel.departurePersonDetails\" required>\r\n                <label for=\"departurePerson\">Person</label>\r\n              </div>\r\n            </div>\r\n            <div class=\"row no-margin\">\r\n              <div class=\"input-field col s12\">\r\n                <input id=\"departureRoad\" type=\"text\" class=\"validate\" name=\"departureRoad\" [(ngModel)]=\"parcel.departure.road\" required>\r\n                <label for=\"departureRoad\">Road</label>\r\n              </div>\r\n            </div>\r\n            <div class=\"row no-margin\">\r\n              <div class=\"input-field col s9\">\r\n                <input id=\"departureCityName\" type=\"text\" class=\"validate\" name=\"departureCityName\" [(ngModel)]=\"parcel.departure.city.name\" required>\r\n                <label for=\"departureCityName\">City</label>\r\n              </div>\r\n              <div class=\"input-field col s3\">\r\n                <input id=\"departureZipCode\" type=\"text\" class=\"validate\" name=\"departureZipCode\" [(ngModel)]=\"parcel.departure.city.zipCode\" required>\r\n                <label for=\"departureZipCode\">ZIP</label>\r\n              </div>\r\n            </div>\r\n            <div class=\"row no-margin\">\r\n              <div class=\"input-field col s12\">\r\n                <input id=\"departureCountry\" type=\"text\" class=\"validate\" name=\"departureCountry\" [(ngModel)]=\"parcel.departure.country\" required>\r\n                <label for=\"departureCountry\">Country</label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col s2\">\r\n            <i class=\"material-icons large center-align\" style=\"color: #6699CC;\">keyboard_arrow_right</i>\r\n          </div>\r\n          <div class=\"col s5\">\r\n            <div class=\"row no-margin\">\r\n              <div class=\"input-field col s12\">\r\n                <p class=\"center-align\">Destination</p>\r\n              </div>\r\n            </div>\r\n            <div class=\"row no-margin\">\r\n              <div class=\"input-field col s12\">\r\n                <input id=\"destinationPerson\" type=\"text\" class=\"validate\" name=\"destinationPerson\" [(ngModel)]=\"parcel.destinationPersonDetails\" required>\r\n                <label for=\"destinationPerson\">Person</label>\r\n              </div>\r\n            </div>\r\n            <div class=\"row no-margin\">\r\n              <div class=\"input-field col s12\">\r\n                <input id=\"destinationRoad\" type=\"text\" class=\"validate\" name=\"destinationRoad\" [(ngModel)]=\"parcel.destination.road\" required>\r\n                <label for=\"destinationRoad\">Road</label>\r\n              </div>\r\n            </div>\r\n            <div class=\"row no-margin\">\r\n              <div class=\"input-field col s9\">\r\n                <input id=\"destinationCityName\" type=\"text\" class=\"validate\" name=\"destinationCityName\" [(ngModel)]=\"parcel.destination.city.name\" required>\r\n                <label for=\"destinationCityName\">City</label>\r\n              </div>\r\n              <div class=\"input-field col s3\">\r\n                <input id=\"destinationZipCode\" type=\"text\" class=\"validate\" name=\"destinationZipCode\" [(ngModel)]=\"parcel.destination.city.zipCode\" required>\r\n                <label for=\"destinationZipCode\">ZIP</label>\r\n              </div>\r\n            </div>\r\n            <div class=\"row no-margin\">\r\n              <div class=\"input-field col s12\">\r\n                <input id=\"destinationCountry\" type=\"text\" class=\"validate\" name=\"destinationCountry\" [(ngModel)]=\"parcel.destination.country\" required>\r\n                <label for=\"destinationCountry\">Country</label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\" style=\"margin: 40px 0;\">\r\n          <div class=\"col s12 center\">\r\n            <button id=\"submitButton\" class=\"btn waves-effect waves-light\" type=\"submit\" name=\"action\">\r\n              <i class=\"material-icons left\">add</i> Generate tracking number\r\n            </button>\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/create-parcel/create-parcel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateParcelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_objects_parcel_management__ = __webpack_require__("./src/app/data-objects/parcel-management.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_parcel_management_service__ = __webpack_require__("./src/app/services/parcel-management.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_data_management_service__ = __webpack_require__("./src/app/services/data-management.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CreateParcelComponent = (function () {
    function CreateParcelComponent(router, parcelManagementService, dataManagementService) {
        this.router = router;
        this.parcelManagementService = parcelManagementService;
        this.dataManagementService = dataManagementService;
    }
    CreateParcelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parcel = new __WEBPACK_IMPORTED_MODULE_1__data_objects_parcel_management__["a" /* Parcel */]();
        this.dataManagementService.listParcelTypes().subscribe(function (response) { return _this.parcelTypeNames = response; });
    };
    CreateParcelComponent.prototype.parcelTypeChanged = function (selectedType) {
        this.parcel.parcelTypeName = this.parcelTypeNames[selectedType.target.options.selectedIndex - 1];
    };
    CreateParcelComponent.prototype.onSubmit = function () {
        var _this = this;
        this.parcelManagementService
            .createParcel(this.parcel)
            .subscribe(function (trackingNumber) {
            if (trackingNumber) {
                _this.router.navigate(['track', trackingNumber]);
            }
        });
    };
    return CreateParcelComponent;
}());
CreateParcelComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-create-parcel',
        template: __webpack_require__("./src/app/create-parcel/create-parcel.component.html"),
        styles: [__webpack_require__("./src/app/create-parcel/create-parcel.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_parcel_management_service__["a" /* ParcelManagementService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_parcel_management_service__["a" /* ParcelManagementService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_data_management_service__["a" /* DataManagementService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_data_management_service__["a" /* DataManagementService */]) === "function" && _c || Object])
], CreateParcelComponent);

var _a, _b, _c;
//# sourceMappingURL=create-parcel.component.js.map

/***/ }),

/***/ "./src/app/data-management/data-management.component.css":
/***/ (function(module, exports) {

module.exports = "#background {\r\n  min-height: 100vh;\r\n  min-width: 100vw;\r\n  padding-top: 100px;\r\n  height: 100%;\r\n}\r\n\r\n.container {\r\n  margin-bottom: 50px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/data-management/data-management.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"background\" class=\"blue-grey lighten-5\">\n  <div class=\"container white z-depth-1\">\n    <div class=\"section\">\n      <app-parcel-type></app-parcel-type>\n    </div>\n    <div class=\"divider\"></div>\n    <div class=\"section\">\n      <app-action-description></app-action-description>\n    </div>\n    <div class=\"divider\"></div>\n    <div class=\"section\">\n      <app-transportation-mode></app-transportation-mode>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/data-management/data-management.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataManagementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DataManagementComponent = (function () {
    function DataManagementComponent() {
    }
    return DataManagementComponent;
}());
DataManagementComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-data-management',
        template: __webpack_require__("./src/app/data-management/data-management.component.html"),
        styles: [__webpack_require__("./src/app/data-management/data-management.component.css")]
    }),
    __metadata("design:paramtypes", [])
], DataManagementComponent);

//# sourceMappingURL=data-management.component.js.map

/***/ }),

/***/ "./src/app/data-objects/authorization.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StaffMember; });
var StaffMember = (function () {
    function StaffMember() {
    }
    return StaffMember;
}());

//# sourceMappingURL=authorization.js.map

/***/ }),

/***/ "./src/app/data-objects/parcel-management.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Location */
/* unused harmony export City */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Parcel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Station; });
var Location = (function () {
    function Location() {
        this.city = new City();
    }
    return Location;
}());

var City = (function () {
    function City() {
    }
    return City;
}());

var Parcel = (function () {
    function Parcel() {
        this.departure = new Location();
        this.destination = new Location();
    }
    return Parcel;
}());

var Station = (function () {
    function Station() {
        this.location = new Location();
    }
    return Station;
}());

//# sourceMappingURL=parcel-management.js.map

/***/ }),

/***/ "./src/app/helper-methods.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelperMethods; });
var HelperMethods = (function () {
    function HelperMethods(authorizationService) {
        this.authorizationService = authorizationService;
    }
    HelperMethods.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    HelperMethods.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message : (error._body) ? JSON.parse(error._body).message : 'Server error';
        console.error(error);
        if (errMsg == 'Authorization token expired') {
            this.authorizationService.logout();
        }
        Materialize.toast(errMsg, 3000, "");
        return error;
    };
    HelperMethods.generateInitialPassword = function () {
        return Math.random().toString(36).slice(-8);
    };
    HelperMethods.parseActionDescription = function (parcel, station) {
        var parsedActionDescription = station.actionDescription;
        parsedActionDescription = parsedActionDescription.replace("#Location#", station.location.city.name + ', ' + station.location.country);
        parsedActionDescription = parsedActionDescription.replace("#Transport#", station.transportationMode);
        parsedActionDescription = parsedActionDescription.replace("#DeparturePerson#", parcel.departurePersonDetails);
        parsedActionDescription = parsedActionDescription.replace("#DestinationPerson#", parcel.destinationPersonDetails);
        parsedActionDescription = parsedActionDescription.replace("#NoteOrPerson#", station.notes ? station.notes : parcel.departurePersonDetails);
        return parsedActionDescription;
    };
    return HelperMethods;
}());

//# sourceMappingURL=helper-methods.js.map

/***/ }),

/***/ "./src/app/home/home.component.css":
/***/ (function(module, exports) {

module.exports = "#searchContainer {\r\n  left: 0;\r\n  right: 0;\r\n  max-width: 960px;\r\n}\r\n\r\n.input-field {\r\n  padding-left: 10px;\r\n  padding-right: 40px;\r\n  margin: 0;\r\n}\r\n\r\n.input-field label {\r\n  right: 0;\r\n  left: unset;\r\n}\r\n\r\n#searchIcon {\r\n  margin-right: 10px;\r\n  cursor: pointer;\r\n}\r\n\r\n#bodySection {\r\n  min-height: calc(100vh - 500px);\r\n  height: 100%;\r\n  padding-top: 70px;\r\n}\r\n\r\n.divider {\r\n  margin: 70px 0;\r\n}\r\n\r\n.btn-floating.btn-large {\r\n  width: 150px;\r\n  height: 150px;\r\n}\r\n\r\n.btn-floating.btn-large i {\r\n  line-height: 150px;\r\n}\r\n\r\n.btn-large i {\r\n  font-size: 120px;\r\n}\r\n\r\n#createNewSection {\r\n  display: none;\r\n  min-height: 100vh;\r\n  min-width: 100vw;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n"

/***/ }),

/***/ "./src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"parallax-container\">\r\n  <div materialize=\"parallax\" class=\"parallax\"><img src=\"../../assets/images/background-1.png\"></div>\r\n</div>\r\n<section id=\"bodySection\" class=\"blue-grey lighten-5\">\r\n  <section id=\"searchSection\">\r\n    <div id=\"searchContainer\" class=\"container\">\r\n      <form (ngSubmit)=\"onSubmit()\" class=\"white\" #searchForm>\r\n        <div class=\"input-field\">\r\n          <input #search id=\"search\" type=\"search\" placeholder=\"Enter your tracking number\" (focus)=\"hideCreateNewSection();\" required>\r\n          <label id=\"searchIcon\" class=\"label-icon\" for=\"search\">\r\n            <i class=\"material-icons\">search</i>\r\n          </label>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </section>\r\n  <div class=\"container\">\r\n    <div class=\"divider\"></div>\r\n  </div>\r\n  <section id=\"chooseNewSection\">\r\n    <div class=\"container center\">\r\n      <div class=\"row\">\r\n        <div class=\"col s12\">\r\n          <a class=\"btn btn-floating btn-large blue-grey pulse\" (click)=\"showCreateNewSection();\">\r\n            <i class=\"material-icons blue-grey-text text-lighten-5\">fiber_new</i>\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</section>\r\n<section id=\"createNewSection\" class=\"blue-grey\" #createNewSection>\r\n  <app-create-parcel></app-create-parcel>\r\n</section>\r\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeComponent = (function () {
    function HomeComponent(router) {
        this.router = router;
    }
    HomeComponent.prototype.onSubmit = function () {
        this.router.navigate(['track', this.search.nativeElement.value]);
    };
    HomeComponent.prototype.showCreateNewSection = function () {
        this.createNewSection.nativeElement.style.display = 'block';
        __WEBPACK_IMPORTED_MODULE_1_jquery__("html, body").animate({ scrollTop: __WEBPACK_IMPORTED_MODULE_1_jquery__('#createNewSection').offset().top }, 1000);
    };
    HomeComponent.prototype.hideCreateNewSection = function () {
        this.createNewSection.nativeElement.style.display = 'none';
    };
    return HomeComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewChild */])('search'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object)
], HomeComponent.prototype, "search", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewChild */])('createNewSection'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _b || Object)
], HomeComponent.prototype, "createNewSection", void 0);
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-home',
        template: __webpack_require__("./src/app/home/home.component.html"),
        styles: [__webpack_require__("./src/app/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _c || Object])
], HomeComponent);

var _a, _b, _c;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "./src/app/login/login.component.css":
/***/ (function(module, exports) {

module.exports = "#background {\r\n  background-size: cover;\r\n  background: url('background-1.d6e56fcd252313bd8c0b.png') no-repeat center center;\r\n  width: 100vw;\r\n  height: 100vh;\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n}\r\n\r\n#trackingImage {\r\n  width: 100px;\r\n  height: 100px;\r\n  margin-bottom: 30px;\r\n}\r\n\r\n#container {\r\n  width: 350px;\r\n}\r\n\r\n.card-panel {\r\n  padding: 50px 30px;\r\n}\r\n\r\n#loginButton {\r\n  margin-top: 50px;\r\n}\r\n\r\n#wrongCredentials {\r\n  display: none;\r\n}\r\n"

/***/ }),

/***/ "./src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"background\">\n  <div class=\"row\" id=\"container\">\n    <div class=\"col s12 card-panel z-depth-2 blue-grey lighten-5\">\n      <form (ngSubmit)=\"onSubmit()\">\n        <div class=\"row center\">\n          <img id=\"trackingImage\" src=\"../../assets/images/tracking-icon.png\">\n        </div>\n        <div class=\"row no-margin\">\n          <div class=\"input-field col s12\">\n            <input id=\"email\" type=\"email\" class=\"validate\" name=\"email\" [(ngModel)]=\"email\" required>\n            <label for=\"email\">Email</label>\n          </div>\n        </div>\n        <div class=\"row no-margin\">\n          <div class=\"input-field col s12\">\n            <input id=\"password\" type=\"password\" class=\"validate\" name=\"password\" [(ngModel)]=\"password\" required>\n            <label for=\"password\">Password</label>\n          </div>\n        </div>\n        <div class=\"row center\" id=\"wrongCredentials\" #wrongCredentialAlert>\n          <span class=\"red-text text-darken-3\">Wrong username or password</span>\n        </div>\n        <div class=\"row no-margin\">\n          <div class=\"col s12\">\n            <button class=\"btn waves-effect waves-light right\" id=\"loginButton\" type=\"submit\" name=\"action\">\n              <i class=\"material-icons left\">lock_open</i> Login\n            </button>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_authorization_service__ = __webpack_require__("./src/app/services/authorization.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(authenticationService, router, route) {
        this.authenticationService = authenticationService;
        this.router = router;
        this.route = route;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
        var isAuthorized = this.authenticationService.isAuthenticated();
        if (isAuthorized) {
            this.routeToPrevPage();
        }
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.authenticationService
            .login(this.email, this.password)
            .subscribe(function (response) {
            if (response) {
                _this.hideWrongCredentialsAlert();
                _this.routeToPrevPage();
            }
            else {
                _this.showWrongCredentialsAlert();
            }
        });
    };
    LoginComponent.prototype.routeToPrevPage = function () {
        this.router.navigateByUrl(this.returnUrl);
    };
    LoginComponent.prototype.showWrongCredentialsAlert = function () {
        this.wrongCredentialAlert.nativeElement.style.display = 'inherit';
    };
    LoginComponent.prototype.hideWrongCredentialsAlert = function () {
        this.wrongCredentialAlert.nativeElement.style.display = 'none';
    };
    return LoginComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewChild */])('wrongCredentialAlert'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object)
], LoginComponent.prototype, "wrongCredentialAlert", void 0);
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-login',
        template: __webpack_require__("./src/app/login/login.component.html"),
        styles: [__webpack_require__("./src/app/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_authorization_service__["a" /* AuthorizationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_authorization_service__["a" /* AuthorizationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object])
], LoginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "./src/app/parcel-details/parcel-details.component.css":
/***/ (function(module, exports) {

module.exports = "ngui-map {\r\n  height: 50vh;\r\n}\r\n\r\n#background {\r\n  padding-top: 20px;\r\n  min-height: 100vh;\r\n  height: 100%;\r\n  width: 100vw;\r\n}\r\n\r\n.counterMarker {\r\n  height: 30px;\r\n  width: 30px;\r\n  font-size: 1.2rem;\r\n  padding: 0 10px;\r\n  line-height: 30px;\r\n  border-radius: 50%;\r\n  background-color: #95a5a6;\r\n  color: #eceff1;\r\n}\r\n\r\n.counterMarker i {\r\n  font-size: 1.2rem;\r\n  margin-left: -4px;\r\n  line-height: 30px;\r\n}\r\n\r\n.counterMarker.disabled {\r\n  opacity: 0.6;\r\n}\r\n\r\n.counterMarker.pulse {\r\n  opacity: 1.0;\r\n}\r\n\r\n#progress {\r\n  font-size: 2rem;\r\n  font-weight: bold;\r\n}\r\n\r\ntd {\r\n  padding: 5px;\r\n  vertical-align: top;\r\n  width: 200px;\r\n}\r\n\r\n#trackingNumber {\r\n  font-size: 2rem;\r\n  vertical-align: middle;\r\n  margin-left: 50px;\r\n}\r\n\r\n#timelineCard {\r\n  height: calc(100vh - 270px);\r\n  overflow-y: scroll;\r\n}\r\n\r\n.collapsible-body {\r\n  background-color: white;\r\n}\r\n\r\n#shipmentDetails {\r\n  height: calc(100vh - 540px);\r\n}\r\n\r\n/* Time line component has to be styled in styles.scss */\r\n\r\n/*\r\n  Vertical time line component styling\r\n  adopted from https://codyhouse.co/demo/vertical-timeline/index.html\r\n */\r\n\r\n::ng-deep vertical-timeline .timeline {\r\n  position: relative !important;\r\n  padding: 2em 0 !important;\r\n  margin-top: 5em !important;\r\n}\r\n\r\n::ng-deep vertical-timeline .timeline::before {\r\n  content: '' !important;\r\n  position: absolute !important;\r\n  top: 0 !important;\r\n  left: 18px !important;\r\n  height: calc(100% - 160px) !important;\r\n  width: 4px !important;\r\n  background: #d7e4ed;\r\n}\r\n\r\n::ng-deep vertical-timeline .timeline > div {\r\n  margin-top: -90px !important;\r\n}\r\n\r\n::ng-deep vertical-timeline .timeline-item:after {\r\n  content: \"\" !important;\r\n  display: table !important;\r\n  clear: both !important;\r\n}\r\n\r\n::ng-deep vertical-timeline .timeline-item:first-child {\r\n  margin-top: 0 !important;\r\n}\r\n\r\n::ng-deep vertical-timeline .timeline-item:last-child {\r\n  margin-bottom: 0 !important;\r\n}\r\n\r\n::ng-deep vertical-timeline .timeline-img {\r\n  width: 60px !important;\r\n  height: 60px !important;\r\n  margin-left: -30px !important;\r\n  /* Force Hardware Acceleration in WebKit */\r\n  -webkit-transform: translateZ(0) !important;\r\n  -webkit-backface-visibility: hidden !important;\r\n  position: relative !important;\r\n  top: 0 !important;\r\n  left: 20px !important;\r\n  border-radius: 50% !important;\r\n  text-align: center;\r\n  background-color: #b0bec5 !important;\r\n}\r\n\r\n@media only screen and (min-width: 1170px) {\r\n  ::ng-deep vertical-timeline .timeline-img {\r\n    font-size: 17px;\r\n  }\r\n  ::ng-deep vertical-timeline .timeline-img p {\r\n    padding-top: 18px !important;\r\n  }\r\n  ::ng-deep vertical-timeline .cssanimations .timeline-img.is-hidden {\r\n    visibility: hidden !important;\r\n  }\r\n}\r\n\r\n::ng-deep vertical-timeline .timeline-content {\r\n  position: relative !important;\r\n  margin-left: 60px !important;\r\n  background: white !important;\r\n  border-radius: 0.25em !important;\r\n  padding: 1em !important;\r\n  -webkit-box-shadow: 0 3px 0 #d7e4ed !important;\r\n          box-shadow: 0 3px 0 #d7e4ed !important;\r\n  margin-top: -60px;\r\n  margin-bottom: 20px;\r\n}\r\n\r\n::ng-deep vertical-timeline .timeline-content:after {\r\n  content: \"\" !important;\r\n  display: table !important;\r\n  clear: both !important;\r\n}\r\n\r\n::ng-deep vertical-timeline .timeline-content h2 {\r\n  color: #303e49 !important;\r\n}\r\n\r\n::ng-deep vertical-timeline .timeline-content p, .timeline-content .date {\r\n  font-size: 0.8125rem !important;\r\n  color: #607d8b !important;\r\n}\r\n\r\n::ng-deep vertical-timeline .timeline-content .date {\r\n  display: inline-block !important;\r\n}\r\n\r\n::ng-deep vertical-timeline .timeline-content p {\r\n  margin: 0 !important;\r\n  line-height: 1.6 !important;\r\n}\r\n\r\n::ng-deep vertical-timeline .timeline-content .date {\r\n  float: left !important;\r\n  padding: 0 !important;\r\n  opacity: .7 !important;\r\n  background: none !important;\r\n}\r\n\r\n::ng-deep vertical-timeline .timeline-content::before {\r\n  top: 24px !important;\r\n  left: auto !important;\r\n  right: 100% !important;\r\n  border-color: transparent !important;\r\n  content: '' !important;\r\n  position: absolute !important;\r\n  height: 0 !important;\r\n  width: 0 !important;\r\n  border: 7px solid transparent !important;\r\n  border-right-color: white !important;\r\n}\r\n\r\n@media only screen and (min-width: 768px) {\r\n  ::ng-deep vertical-timeline .timeline-content h2 {\r\n    font-size: 1.25rem !important;\r\n  }\r\n  ::ng-deep vertical-timeline .timeline-content p {\r\n    font-size: 2rem !important;\r\n  }\r\n  ::ng-deep vertical-timeline .timeline-content .date {\r\n    font-size: 0.875rem !important;\r\n  }\r\n}\r\n\r\n.amber {\r\n  background-color: #f1c40f !important;\r\n}\r\n"

/***/ }),

/***/ "./src/app/parcel-details/parcel-details.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"background\" class=\"blue-grey lighten-5\" *ngIf=\"parcel\">\r\n  <div class=\"row no-margin\">\r\n    <div class=\"col s5\">\r\n      <div class=\"row\">\r\n        <div class=\"col s12\">\r\n          <div class=\"card-panel blue-grey z-depth-1 no-margin\">\r\n            <a [routerLink]=\"['']\" class=\"btn blue-grey lighten-4 blue-grey-text\" data-delay=\"50\">\r\n              <i class=\"material-icons medium left blue-grey-text\">chevron_left</i>Back\r\n            </a>\r\n            <span id=\"trackingNumber\" class=\"white-text\">Shipment: {{parcel.trackingNumber}}</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col s12\">\r\n          <div class=\"card-panel z-depth-1 no-margin center\" [ngClass]=\r\n            \"{'green': parcel.stations[0].actionDescription == 'Parcel got delivered and was taken from #NoteOrPerson#',\r\n                'amber': parcel.stations[0].actionDescription != 'Parcel got delivered and was taken from #NoteOrPerson#'}\">\r\n            <span id=\"progress\" class=\"white-text\">\r\n              {{parseActionDescription(parcel.stations[0])}}\r\n            </span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col s12\">\r\n          <div id=\"timelineCard\" class=\"card-panel blue-grey z-depth-0 no-margin\">\r\n            <div class=\"row\" *ngIf=\"showAddStationButton\">\r\n              <div class=\"col s12 center\">\r\n                <a [routerLink]=\"['/parcelManagement', parcel.trackingNumber]\" class=\"btn\">Add a station</a>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col s12\">\r\n                <vertical-timeline style=\"overflow-y: scroll;\">\r\n                  <vertical-timeline-card *ngFor=\"let station of parcel.stations.reverse()\" [dateValue]=\"station.timestamp\">\r\n                    <div class=\"row\">\r\n                      <div class=\"col s12\">\r\n                        <h2>{{parseActionDescription(station)}}</h2>\r\n                      </div>\r\n                    </div>\r\n                  </vertical-timeline-card>\r\n                </vertical-timeline>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col s7\" style=\"padding-right: 30px;\">\r\n      <div class=\"row\">\r\n        <div class=\"col s12\">\r\n          <ngui-map #map [options]=\"mapOptions\" (mapReady$)=\"onMapReady($event)\">\r\n            <custom-marker *ngFor=\"let address of addresses; let iAddress = index\"\r\n                           [position]=\"address\"\r\n                           (initialized$)=\"onMarkerInit($event);\">\r\n              <div class=\"counterMarker\" [ngClass]=\"{'pulse': iAddress == addresses.length - 2, 'disabled' : iAddress > 0 && iAddress < addresses.length - 2}\">\r\n                <ng-container *ngIf=\"iAddress == 0\"><i class=\"material-icons\">receipt</i></ng-container>\r\n                <ng-container *ngIf=\"iAddress > 0 && iAddress < addresses.length - 1\">{{iAddress}}</ng-container>\r\n                <ng-container *ngIf=\"iAddress == addresses.length - 1\"><i class=\"material-icons\">location_searching</i></ng-container>\r\n              </div>\r\n            </custom-marker>\r\n            <polyline *ngIf=\"positions\" [editable]=\"false\"\r\n                      [path]=\"filterStationPositions(positions)\"\r\n                      [geodesic]=\"true\"\r\n                      [strokeColor]=\"'#a5d6a7'\"\r\n                      [strokeOpacity]=\"1\"\r\n                      [strokeWeight]=\"2\"></polyline>\r\n          </ngui-map>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col s12\">\r\n          <div id=\"shipmentDetails\" class=\"card-panel blue-grey z-depth-0 no-margin\">\r\n            <h5 class=\"white-text\">Shipment details</h5>\r\n            <div class=\"row\">\r\n              <div class=\"col s12\">\r\n                <ul materialize=\"collapsible\" class=\"collapsible\" data-collapsible=\"accordion\">\r\n                  <li>\r\n                    <div class=\"collapsible-header active\"><i class=\"material-icons\">receipt</i>General information</div>\r\n                    <div class=\"collapsible-body\">\r\n                      <table class=\"striped\">\r\n                        <tbody>\r\n                        <tr>\r\n                          <td class=\"bold-text no-padding\">Tracking number:</td>\r\n                          <td class=\"no-padding blue-grey-text\">{{parcel.trackingNumber}}</td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td class=\"bold-text no-padding\">Handover:</td>\r\n                          <td class=\"no-padding\">{{convertToDate(parcel.handOverTimestamp)}}</td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td class=\"bold-text no-padding\">Parcel type:</td>\r\n                          <td class=\"no-padding\">{{parcel.parcelTypeName}}</td>\r\n                        </tr>\r\n                        </tbody>\r\n                      </table>\r\n                    </div>\r\n                  </li>\r\n                  <li>\r\n                    <div class=\"collapsible-header\"><i class=\"material-icons\">location_city</i>Departure</div>\r\n                    <div class=\"collapsible-body\">\r\n                      <table class=\"striped\">\r\n                        <tbody>\r\n                        <tr>\r\n                          <td class=\"bold-text no-padding\">Person details:</td>\r\n                          <td class=\"no-padding\">{{parcel.departurePersonDetails}}</td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td class=\"bold-text no-padding\">Road:</td>\r\n                          <td class=\"no-padding\">{{parcel.departure.road}}</td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td class=\"bold-text no-padding\">City:</td>\r\n                          <td class=\"no-padding\">{{parcel.departure.city.name}}</td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td class=\"bold-text no-padding\">Country:</td>\r\n                          <td class=\"no-padding\">{{parcel.departure.country}}</td>\r\n                        </tr>\r\n                        </tbody>\r\n                      </table>\r\n                    </div>\r\n                  </li>\r\n                  <li>\r\n                    <div class=\"collapsible-header\"><i class=\"material-icons\">location_searching</i>Destination</div>\r\n                    <div class=\"collapsible-body\">\r\n                      <table class=\"striped\">\r\n                        <tbody>\r\n                        <tr>\r\n                          <td class=\"bold-text no-padding\">Person details:</td>\r\n                          <td class=\"no-padding\">{{parcel.destinationPersonDetails}}</td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td class=\"bold-text no-padding\">Road:</td>\r\n                          <td class=\"no-padding\">{{parcel.destination.road}}</td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td class=\"bold-text no-padding\">City:</td>\r\n                          <td class=\"no-padding\">{{parcel.destination.city.name}}</td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td class=\"bold-text no-padding\">Country:</td>\r\n                          <td class=\"no-padding\">{{parcel.destination.country}}</td>\r\n                        </tr>\r\n                        </tbody>\r\n                      </table>\r\n                    </div>\r\n                  </li>\r\n                </ul>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/parcel-details/parcel-details.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParcelDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_parcel_management_service__ = __webpack_require__("./src/app/services/parcel-management.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_methods__ = __webpack_require__("./src/app/helper-methods.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_forkJoin__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/forkJoin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_authorization_service__ = __webpack_require__("./src/app/services/authorization.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_zip__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/zip.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ParcelDetailsComponent = (function () {
    function ParcelDetailsComponent(router, route, authorizationService, parcelManagementService) {
        this.router = router;
        this.route = route;
        this.authorizationService = authorizationService;
        this.parcelManagementService = parcelManagementService;
        this.mapOptions = {
            center: { lat: 52.040055, lng: 8.540920 },
            maxZoom: 17,
            minZoom: 4,
            zoom: 13,
            disableDefaultUI: true,
            fullscreenControl: true,
            zoomControl: true,
            styles: [{
                    "featureType": "all",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "weight": 2.00
                        }
                    ]
                }, {
                    "featureType": "all",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                            "color": "#9c9c9c"
                        }
                    ]
                }, {
                    "featureType": "all",
                    "elementType": "labels.text",
                    "stylers": [{
                            "visibility": "on"
                        }
                    ]
                }, {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [{
                            "color": "#f2f2f2"
                        }
                    ]
                }, {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "color": "#ffffff"
                        }
                    ]
                }, {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "color": "#ffffff"
                        }
                    ]
                }, {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [{
                            "visibility": "off"
                        }
                    ]
                }, {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [{
                            "saturation": -100
                        }, {
                            "lightness": 45
                        }
                    ]
                }, {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "color": "#eeeeee"
                        }
                    ]
                }, {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                            "color": "#7b7b7b"
                        }
                    ]
                }, {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                            "color": "#ffffff"
                        }
                    ]
                }, {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [{
                            "visibility": "simplified"
                        }
                    ]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [{
                            "visibility": "off"
                        }
                    ]
                }, {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [{
                            "visibility": "off"
                        }
                    ]
                }, {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [{
                            "color": "#46bcec"
                        }, {
                            "visibility": "on"
                        }
                    ]
                }, {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "color": "#c8d7d4"
                        }
                    ]
                }, {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                            "color": "#070707"
                        }
                    ]
                }, {
                    "featureType": "water",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                            "color": "#ffffff"
                        }
                    ]
                }
            ]
        };
        this.showAddStationButton = false;
    }
    ParcelDetailsComponent.prototype.ngOnInit = function () {
        this.loadParcel();
        this.updateShowAddStationButton();
    };
    ParcelDetailsComponent.prototype.onMapReady = function (map) {
        this.loadPositions();
    };
    ParcelDetailsComponent.prototype.onMarkerInit = function (marker) {
        var bounds = new google.maps.LatLngBounds();
        this.positions.forEach(function (marker) { return bounds.extend(marker); });
        this.mapComponent.map.fitBounds(bounds);
    };
    ParcelDetailsComponent.prototype.parseActionDescription = function (station) {
        return __WEBPACK_IMPORTED_MODULE_4__helper_methods__["a" /* HelperMethods */].parseActionDescription(this.parcel, station);
    };
    ParcelDetailsComponent.prototype.convertToDate = function (timestamp) {
        return new Date(timestamp);
    };
    ParcelDetailsComponent.prototype.filterStationPositions = function (positions) {
        return positions.filter(function (position, index) { return index > 0 && index < positions.length - 1; });
    };
    ParcelDetailsComponent.prototype.loadPositions = function () {
        var _this = this;
        if (typeof (google) == 'undefined' || !this.mapComponent) {
            return;
        }
        var addresses = this.buildAddressArrayForStations();
        var geoObservables = this.prepareAddressTranslation(addresses);
        __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["a" /* Observable */].forkJoin(geoObservables).subscribe(function (responses) {
            _this.positions = _this.extractPositions(responses);
            _this.addresses = addresses;
        });
    };
    ParcelDetailsComponent.prototype.prepareAddressTranslation = function (addresses) {
        var _this = this;
        return addresses
            .map(function (address) { return _this.mapComponent.geoCoder.geocode({ address: address })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["a" /* Observable */].of({}); })
            .map(function (response) { return (response.length > 0) ? response[0] : []; }); });
    };
    ParcelDetailsComponent.prototype.buildAddressArrayForStations = function () {
        var addresses = [];
        addresses.push(this.parcel.departure.road + ', ' + this.parcel.departure.city.name + ' ' + this.parcel.departure.country);
        this.parcel.stations.forEach(function (station) { return addresses.push(station.location.road + ', ' + station.location.city.name + ' ' + station.location.country); });
        addresses.push(this.parcel.destination.road + ', ' + this.parcel.destination.city.name + ' ' + this.parcel.destination.country);
        addresses = addresses.filter(function (address) { return address; });
        return addresses;
    };
    ParcelDetailsComponent.prototype.loadParcel = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) { return _this.parcelManagementService.getParcel(params.get('trackingNumber')); })
            .catch(function (error) { _this.router.navigate(['']); return []; })
            .subscribe(function (parcel) {
            _this.parcel = parcel;
            _this.loadPositions();
        });
    };
    ParcelDetailsComponent.prototype.updateShowAddStationButton = function () {
        var _this = this;
        if (this.authorizationService.isAuthenticated()) {
            __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["a" /* Observable */].zip(this.authorizationService.isAdmin(), this.authorizationService.isStaff()).subscribe(function (_a) {
                var isAdmin = _a[0], isStaff = _a[1];
                return _this.showAddStationButton = (isAdmin || isStaff);
            });
        }
    };
    ParcelDetailsComponent.prototype.extractPositions = function (responses) {
        var positions = [];
        responses.forEach(function (response) {
            if (response.geometry) {
                positions.push(new google.maps.LatLng(response.geometry.location.lat(), response.geometry.location.lng()));
            }
        });
        return positions;
    };
    return ParcelDetailsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewChild */])('map'),
    __metadata("design:type", Object)
], ParcelDetailsComponent.prototype, "mapComponent", void 0);
ParcelDetailsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-parcel-details',
        template: __webpack_require__("./src/app/parcel-details/parcel-details.component.html"),
        styles: [__webpack_require__("./src/app/parcel-details/parcel-details.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_8__services_authorization_service__["a" /* AuthorizationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__services_authorization_service__["a" /* AuthorizationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_parcel_management_service__["a" /* ParcelManagementService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_parcel_management_service__["a" /* ParcelManagementService */]) === "function" && _d || Object])
], ParcelDetailsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=parcel-details.component.js.map

/***/ }),

/***/ "./src/app/parcel-type/parcel-type.component.css":
/***/ (function(module, exports) {

module.exports = ".container {\r\n  padding: 20px;\r\n}\r\n\r\n.deleteIcon {\r\n  cursor: pointer;\r\n}\r\n"

/***/ }),

/***/ "./src/app/parcel-type/parcel-type.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col s12\">\n    <h1 class=\"center-align\">Parcel types</h1>\n  </div>\n</div>\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col s12\">\n      <table>\n        <thead>\n        <tr>\n          <th>Type</th>\n          <th class=\"center-align\">Delete</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr *ngFor=\"let parcelType of parcelTypes\">\n          <td>{{parcelType}}</td>\n          <td class=\"center\">\n            <a materialize=\"tooltip\" class=\"modal-trigger tooltipped\" (click)=\"openDeleteParcelTypeModal(parcelType)\" href=\"#deleteParcelTypeModal\"\n               data-delay=\"50\" data-tooltip=\"Delete parcel type\" data-position=\"bottom\">\n              <i class=\"material-icons deleteIcon blue-grey-text\">delete</i>\n            </a>\n          </td>\n        </tr>\n        <tr *ngIf=\"parcelTypes && parcelTypes.length == 0\">\n          <td colspan=\"4\" class=\"center\">No parcel types in database!</td>\n        </tr>\n        <tr>\n          <td>\n            <a materialize=\"tooltip\" class=\"btn-floating waves-effect waves-light blue-grey tooltipped modal-trigger\"\n               data-delay=\"50\" data-tooltip=\"Add a parcel type\" data-position=\"right\" (click)=\"openNewParcelTypeModal()\" href=\"#addParcelTypeModal\">\n              <i class=\"material-icons\">add</i>\n            </a>\n          </td>\n        </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n<!-- Delete parcel type modal -->\n<div id=\"deleteParcelTypeModal\" class=\"modal bottom-sheet blue-grey lighten-5\" materialize=\"modal\" [materializeParams]=\"[{dismissible: true}]\" [materializeActions]=\"deleteParcelTypeModalActions\">\n  <div class=\"modal-content\">\n    <h4>Are you sure, that you want to delete the parcel type?</h4>\n    <p *ngIf=\"delParcelType\">{{delParcelType}} can´t get selected anymore if you proceed.</p>\n  </div>\n  <div class=\"modal-footer blue-grey lighten-5\">\n    <a class=\"modal-action modal-close btn-flat\">Abort</a>\n    <a class=\"modal-action modal-close waves-effect waves-red waves-darken-3 btn-flat\" (click)=\"deleteParcelType(delParcelType);\">Proceed</a>\n  </div>\n</div>\n\n<!-- Add parcel type modal -->\n<div id=\"addParcelTypeModal\" class=\"modal blue-grey lighten-5\" materialize=\"modal\" [materializeParams]=\"[{dismissible: false}]\" [materializeActions]=\"newParcelTypeModalActions\">\n  <div class=\"modal-content\">\n    <a class=\"modal-action modal-close waves-effect waves-red waves-darken-3 btn-flat\">\n      <i class=\"material-icons blue-grey-text\">cancel</i>\n    </a>\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h4 class=\"center-align\">Add a new parcel type</h4>\n        </div>\n      </div>\n      <form>\n        <div class=\"row no-margin\">\n          <div class=\"input-field col s12\">\n            <input id=\"parcelTypeName\" type=\"text\" class=\"validate\" name=\"parcelTypeName\" [(ngModel)]=\"newParcelTypeName\" required>\n            <label for=\"parcelTypeName\">Parcel type</label>\n          </div>\n          <div class=\"input-field col s12\">\n            <input id=\"parcelTypeKey\" type=\"text\" class=\"validate\" name=\"parcelTypeKey\" [(ngModel)]=\"newParcelTypeKey\" required>\n            <label for=\"parcelTypeKey\">Parcel type (has to consists of two digits)</label>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n  <div class=\"modal-footer blue-grey lighten-5\">\n    <a class=\"waves-effect modal-action modal-close waves-green waves-darken-3 btn-flat\" (click)=\"addParcelType(newParcelTypeName, newParcelTypeKey);\">Add parcel type</a>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/parcel-type/parcel-type.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParcelTypeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_data_management_service__ = __webpack_require__("./src/app/services/data-management.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ParcelTypeComponent = (function () {
    function ParcelTypeComponent(dataManagementService) {
        this.dataManagementService = dataManagementService;
        this.parcelTypes = [];
        this.newParcelTypeModalActions = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.deleteParcelTypeModalActions = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    ParcelTypeComponent.prototype.ngOnInit = function () {
        this.updateParcelTypes();
        this.newParcelTypeName = "";
        this.newParcelTypeKey = "";
    };
    ParcelTypeComponent.prototype.openDeleteParcelTypeModal = function (parcelType) {
        this.delParcelType = parcelType;
        this.deleteParcelTypeModalActions.emit({ action: "modal", params: ['open'] });
    };
    ParcelTypeComponent.prototype.openNewParcelTypeModal = function () {
        this.newParcelTypeModalActions.emit({ action: "modal", params: ['open'] });
    };
    ParcelTypeComponent.prototype.addParcelType = function (parcelTypeName, parcelTypeKey) {
        var _this = this;
        this.dataManagementService.addParcelType(parcelTypeName, parcelTypeKey).subscribe(function (response) {
            _this.updateParcelTypes();
            _this.newParcelTypeName = "";
            _this.newParcelTypeKey = "";
        });
    };
    ParcelTypeComponent.prototype.deleteParcelType = function (type) {
        var _this = this;
        this.dataManagementService.removeParcelType(type).subscribe(function (response) { return _this.updateParcelTypes(); });
    };
    //actions
    ParcelTypeComponent.prototype.updateParcelTypes = function () {
        var _this = this;
        this.dataManagementService.listParcelTypes().subscribe(function (response) { return _this.parcelTypes = response; });
    };
    return ParcelTypeComponent;
}());
ParcelTypeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-parcel-type',
        template: __webpack_require__("./src/app/parcel-type/parcel-type.component.html"),
        styles: [__webpack_require__("./src/app/parcel-type/parcel-type.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_data_management_service__["a" /* DataManagementService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_data_management_service__["a" /* DataManagementService */]) === "function" && _a || Object])
], ParcelTypeComponent);

var _a;
//# sourceMappingURL=parcel-type.component.js.map

/***/ }),

/***/ "./src/app/routing/app.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ROUTE_CONFIG */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_login_component__ = __webpack_require__("./src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component__ = __webpack_require__("./src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__staff_management_staff_management_component__ = __webpack_require__("./src/app/staff-management/staff-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_guard__ = __webpack_require__("./src/app/routing/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__parcel_details_parcel_details_component__ = __webpack_require__("./src/app/parcel-details/parcel-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_management_data_management_component__ = __webpack_require__("./src/app/data-management/data-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__add_station_add_station_component__ = __webpack_require__("./src/app/add-station/add-station.component.ts");








var ROUTE_CONFIG = [
    {
        path: 'login',
        component: __WEBPACK_IMPORTED_MODULE_1__login_login_component__["a" /* LoginComponent */]
    },
    {
        path: 'staff',
        canActivate: [__WEBPACK_IMPORTED_MODULE_4__auth_guard__["a" /* AuthGuard */]],
        component: __WEBPACK_IMPORTED_MODULE_3__staff_management_staff_management_component__["a" /* StaffManagementComponent */]
    },
    {
        path: 'track/:trackingNumber',
        component: __WEBPACK_IMPORTED_MODULE_5__parcel_details_parcel_details_component__["a" /* ParcelDetailsComponent */]
    },
    {
        path: 'data',
        canActivate: [__WEBPACK_IMPORTED_MODULE_4__auth_guard__["a" /* AuthGuard */]],
        component: __WEBPACK_IMPORTED_MODULE_6__data_management_data_management_component__["a" /* DataManagementComponent */]
    },
    {
        path: 'parcelManagement/:trackingNumber',
        canActivate: [__WEBPACK_IMPORTED_MODULE_4__auth_guard__["a" /* AuthGuard */]],
        component: __WEBPACK_IMPORTED_MODULE_7__add_station_add_station_component__["a" /* AddStationComponent */]
    },
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
var AppRoutesModule = __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* RouterModule */].forRoot(ROUTE_CONFIG);
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ "./src/app/routing/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_authorization_service__ = __webpack_require__("./src/app/services/authorization.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_config__ = __webpack_require__("./src/assets/config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_zip__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/zip.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AuthGuard = AuthGuard_1 = (function () {
    function AuthGuard(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.routerConfig = __WEBPACK_IMPORTED_MODULE_4__assets_config__["a" /* ROUTER_CONFIG */];
    }
    AuthGuard.showForbiddenToast = function (url) {
        Materialize.toast('You are not allowed to access the page ' + url, 3000, '');
    };
    AuthGuard.prototype.canActivate = function (next, state) {
        var route = state.url;
        if (this.isAnonymUser()) {
            return this.canAnonymActivate(route);
        }
        return this.checkPrivileges(route);
    };
    //actions
    AuthGuard.prototype.checkPrivileges = function (route) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].zip(this.authenticationService.isAdmin(), this.authenticationService.isStaff(), function (isAdmin, isStaff) {
            if (isAdmin) {
                return _this.routeMatchesRegexFromList(_this.routerConfig.allowedAdminRoutes, route);
            }
            var canAccess = isStaff && _this.routeMatchesRegexFromList(_this.routerConfig.allowedStaffRoutes, route);
            if (!canAccess) {
                _this.router.navigate(['']);
                AuthGuard_1.showForbiddenToast(route);
            }
            return canAccess;
        });
    };
    AuthGuard.prototype.canAnonymActivate = function (route) {
        if (!this.routeMatchesRegexFromList(this.routerConfig.allowedUserRoutes, route)) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: route } });
            return false;
        }
        return true;
    };
    AuthGuard.prototype.routeMatchesRegexFromList = function (allowedRoutes, route) {
        return allowedRoutes.filter(function (allowedRoute) { return route.match(allowedRoute); }).length > 0;
    };
    AuthGuard.prototype.isAnonymUser = function () {
        return !this.authenticationService.isAuthenticated();
    };
    return AuthGuard;
}());
AuthGuard = AuthGuard_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_authorization_service__["a" /* AuthorizationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_authorization_service__["a" /* AuthorizationService */]) === "function" && _b || Object])
], AuthGuard);

var AuthGuard_1, _a, _b;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "./src/app/services/authorization.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthorizationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sha_js__ = __webpack_require__("./node_modules/sha.js/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sha_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sha_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_cookie__ = __webpack_require__("./node_modules/ngx-cookie/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helper_methods__ = __webpack_require__("./src/app/helper-methods.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_config__ = __webpack_require__("./src/assets/config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AuthorizationService = AuthorizationService_1 = (function () {
    function AuthorizationService(router, http, cookieService) {
        this.router = router;
        this.http = http;
        this.cookieService = cookieService;
        this.AUTHORIZATION_TOKEN_COOKIE = 'authorizationToken';
        this.routerConfig = __WEBPACK_IMPORTED_MODULE_7__assets_config__["a" /* ROUTER_CONFIG */];
        this.helperMethods = new __WEBPACK_IMPORTED_MODULE_6__helper_methods__["a" /* HelperMethods */](this);
    }
    AuthorizationService.prototype.isBackendRunning = function () {
        return this.http.get(this.routerConfig.serverAddress);
    };
    AuthorizationService.prototype.login = function (email, password) {
        var _this = this;
        var params = {
            email: email,
            password: AuthorizationService_1.hashPassword(password)
        };
        return this.http.get(this.routerConfig.serverAddress + '/authorize', { params: params })
            .map(__WEBPACK_IMPORTED_MODULE_6__helper_methods__["a" /* HelperMethods */].extractData)
            .catch(function (event) { return _this.helperMethods.handleError(event); })
            .map(function (response) {
            if (response.authorized) {
                _this.storeTokenIntoCookies(response.authorizationToken);
            }
            return response.authorized;
        });
    };
    AuthorizationService.prototype.isAdmin = function () {
        var _this = this;
        var params = {
            authorizationToken: this.getToken()
        };
        return this.http.get(this.routerConfig.serverAddress + '/isAdmin', { params: params })
            .map(__WEBPACK_IMPORTED_MODULE_6__helper_methods__["a" /* HelperMethods */].extractData)
            .catch(function (event) { return _this.helperMethods.handleError(event); })
            .map(function (response) { return response.admin; });
    };
    AuthorizationService.prototype.isStaff = function () {
        var _this = this;
        var params = {
            authorizationToken: this.getToken()
        };
        return this.http.get(this.routerConfig.serverAddress + '/isStaff', { params: params })
            .map(__WEBPACK_IMPORTED_MODULE_6__helper_methods__["a" /* HelperMethods */].extractData)
            .catch(function (event) { return _this.helperMethods.handleError(event); })
            .map(function (response) { return response.staff; });
    };
    AuthorizationService.prototype.isAuthenticated = function () {
        return this.cookieService.get(this.AUTHORIZATION_TOKEN_COOKIE) != null;
    };
    AuthorizationService.prototype.logout = function () {
        this.cookieService.remove(this.AUTHORIZATION_TOKEN_COOKIE);
        this.router.navigateByUrl('/login');
        var params = {
            authorizationToken: this.getToken()
        };
        this.http.delete(this.routerConfig.serverAddress + '/logout', { params: params }).subscribe();
    };
    //actions
    AuthorizationService.hashPassword = function (rawPassword) {
        return __WEBPACK_IMPORTED_MODULE_4_sha_js__('sha256').update(rawPassword).digest('hex');
    };
    AuthorizationService.prototype.storeTokenIntoCookies = function (token) {
        this.cookieService.put(this.AUTHORIZATION_TOKEN_COOKIE, token);
    };
    AuthorizationService.prototype.getToken = function () {
        return this.cookieService.get(this.AUTHORIZATION_TOKEN_COOKIE);
    };
    return AuthorizationService;
}());
AuthorizationService = AuthorizationService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_8__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5_ngx_cookie__["b" /* CookieService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ngx_cookie__["b" /* CookieService */]) === "function" && _c || Object])
], AuthorizationService);

var AuthorizationService_1, _a, _b, _c;
//# sourceMappingURL=authorization.service.js.map

/***/ }),

/***/ "./src/app/services/data-management.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataManagementService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__authorization_service__ = __webpack_require__("./src/app/services/authorization.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_methods__ = __webpack_require__("./src/app/helper-methods.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_config__ = __webpack_require__("./src/assets/config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DataManagementService = (function () {
    function DataManagementService(http, authorizationService) {
        this.http = http;
        this.authorizationService = authorizationService;
        this.routerConfig = __WEBPACK_IMPORTED_MODULE_4__assets_config__["a" /* ROUTER_CONFIG */];
        this.helperMethods = new __WEBPACK_IMPORTED_MODULE_3__helper_methods__["a" /* HelperMethods */](authorizationService);
    }
    DataManagementService.prototype.listParcelTypes = function () {
        var _this = this;
        return this.http.get(this.routerConfig.serverAddress + '/listParcelTypes')
            .map(__WEBPACK_IMPORTED_MODULE_3__helper_methods__["a" /* HelperMethods */].extractData)
            .catch(function (event) { return _this.helperMethods.handleError(event); })
            .map(function (response) { return response.parcelTypes; });
    };
    DataManagementService.prototype.listTransportationModes = function () {
        var _this = this;
        return this.http.get(this.routerConfig.serverAddress + '/listTransportationModes')
            .map(__WEBPACK_IMPORTED_MODULE_3__helper_methods__["a" /* HelperMethods */].extractData)
            .catch(function (event) { return _this.helperMethods.handleError(event); })
            .map(function (response) { return response.transportationModes; });
    };
    DataManagementService.prototype.listActionDescriptions = function () {
        var _this = this;
        return this.http.get(this.routerConfig.serverAddress + '/listActionDescriptions')
            .map(__WEBPACK_IMPORTED_MODULE_3__helper_methods__["a" /* HelperMethods */].extractData)
            .catch(function (event) { return _this.helperMethods.handleError(event); })
            .map(function (response) { return response.actionDescriptions; });
    };
    DataManagementService.prototype.addTransportationMode = function (mode) {
        var _this = this;
        var body = {
            authorizationToken: this.authorizationService.getToken(),
            mode: mode
        };
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.routerConfig.serverAddress + '/addTransportationMode', JSON.stringify(body), options)
            .catch(function (event) { return _this.helperMethods.handleError(event); });
    };
    DataManagementService.prototype.addActionDescription = function (actionDescription) {
        var _this = this;
        var body = {
            authorizationToken: this.authorizationService.getToken(),
            actionDescription: actionDescription
        };
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.routerConfig.serverAddress + '/addActionDescription', JSON.stringify(body), options)
            .catch(function (event) { return _this.helperMethods.handleError(event); });
    };
    DataManagementService.prototype.addParcelType = function (type, key) {
        var _this = this;
        var body = {
            authorizationToken: this.authorizationService.getToken(),
            type: type,
            key: key
        };
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.routerConfig.serverAddress + '/addParcelType', JSON.stringify(body), options)
            .catch(function (event) { return _this.helperMethods.handleError(event); });
    };
    DataManagementService.prototype.removeTransportationMode = function (mode) {
        var _this = this;
        var params = {
            authorizationToken: this.authorizationService.getToken(),
            mode: mode
        };
        return this.http.delete(this.routerConfig.serverAddress + '/removeTransportationMode', { params: params })
            .catch(function (event) { return _this.helperMethods.handleError(event); });
    };
    DataManagementService.prototype.removeActionDescription = function (action) {
        var _this = this;
        var params = {
            authorizationToken: this.authorizationService.getToken(),
            action: action
        };
        return this.http.delete(this.routerConfig.serverAddress + '/removeActionDescription', { params: params })
            .catch(function (event) { return _this.helperMethods.handleError(event); });
    };
    DataManagementService.prototype.removeParcelType = function (type) {
        var _this = this;
        var params = {
            authorizationToken: this.authorizationService.getToken(),
            type: type
        };
        return this.http.delete(this.routerConfig.serverAddress + '/removeParcelType', { params: params })
            .catch(function (event) { return _this.helperMethods.handleError(event); });
    };
    return DataManagementService;
}());
DataManagementService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__authorization_service__["a" /* AuthorizationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__authorization_service__["a" /* AuthorizationService */]) === "function" && _b || Object])
], DataManagementService);

var _a, _b;
//# sourceMappingURL=data-management.service.js.map

/***/ }),

/***/ "./src/app/services/parcel-management.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParcelManagementService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper_methods__ = __webpack_require__("./src/app/helper-methods.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_config__ = __webpack_require__("./src/assets/config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__authorization_service__ = __webpack_require__("./src/app/services/authorization.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ParcelManagementService = (function () {
    function ParcelManagementService(http, authorizationService) {
        this.http = http;
        this.authorizationService = authorizationService;
        this.routerConfig = __WEBPACK_IMPORTED_MODULE_5__assets_config__["a" /* ROUTER_CONFIG */];
        this.helperMethods = new __WEBPACK_IMPORTED_MODULE_2__helper_methods__["a" /* HelperMethods */](authorizationService);
    }
    ParcelManagementService.prototype.createParcel = function (parcel) {
        var _this = this;
        parcel.handOverTimestamp = new Date().getTime();
        var parameter = { parcel: parcel };
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.routerConfig.serverAddress + '/createParcel', JSON.stringify(parameter), options)
            .map(__WEBPACK_IMPORTED_MODULE_2__helper_methods__["a" /* HelperMethods */].extractData)
            .catch(function (event) { return _this.helperMethods.handleError(event); })
            .map(function (response) { return response.trackingNumber; });
    };
    ParcelManagementService.prototype.getParcel = function (trackingNumber) {
        var _this = this;
        var params = { trackingNumber: trackingNumber };
        return this.http.get(this.routerConfig.serverAddress + '/getParcel', { params: params })
            .map(__WEBPACK_IMPORTED_MODULE_2__helper_methods__["a" /* HelperMethods */].extractData)
            .catch(function (event) { return _this.helperMethods.handleError(event); })
            .map(function (response) { return response.parcel; });
    };
    ParcelManagementService.prototype.addStation = function (trackingNumber, station) {
        var _this = this;
        station.timestamp = new Date().getTime();
        var body = {
            authorizationToken: this.authorizationService.getToken(),
            station: station,
            trackingNumber: trackingNumber
        };
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.patch(this.routerConfig.serverAddress + '/addStation', JSON.stringify(body), options)
            .catch(function (event) { return _this.helperMethods.handleError(event); });
    };
    return ParcelManagementService;
}());
ParcelManagementService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__authorization_service__["a" /* AuthorizationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__authorization_service__["a" /* AuthorizationService */]) === "function" && _b || Object])
], ParcelManagementService);

var _a, _b;
//# sourceMappingURL=parcel-management.service.js.map

/***/ }),

/***/ "./src/app/services/staff-management.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StaffManagementService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_config__ = __webpack_require__("./src/assets/config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_methods__ = __webpack_require__("./src/app/helper-methods.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__authorization_service__ = __webpack_require__("./src/app/services/authorization.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StaffManagementService = (function () {
    function StaffManagementService(http, authorizationService) {
        this.http = http;
        this.authorizationService = authorizationService;
        this.routerConfig = __WEBPACK_IMPORTED_MODULE_2__assets_config__["a" /* ROUTER_CONFIG */];
        this.helperMethods = new __WEBPACK_IMPORTED_MODULE_3__helper_methods__["a" /* HelperMethods */](authorizationService);
    }
    StaffManagementService.prototype.listStaff = function () {
        var _this = this;
        var params = {
            authorizationToken: this.authorizationService.getToken()
        };
        return this.http.get(this.routerConfig.serverAddress + '/listStaff', { params: params })
            .map(__WEBPACK_IMPORTED_MODULE_3__helper_methods__["a" /* HelperMethods */].extractData)
            .catch(function (event) { return _this.helperMethods.handleError(event); })
            .map(function (response) { return response.staffMembers; });
    };
    StaffManagementService.prototype.deleteStaffMember = function (id) {
        var _this = this;
        var params = {
            authorizationToken: this.authorizationService.getToken(),
            staffID: id
        };
        return this.http.delete(this.routerConfig.serverAddress + '/removeStaff', { params: params })
            .catch(function (event) { return _this.helperMethods.handleError(event); });
    };
    StaffManagementService.prototype.addStaffMember = function (staffMember) {
        var _this = this;
        staffMember.password = __WEBPACK_IMPORTED_MODULE_4__authorization_service__["a" /* AuthorizationService */].hashPassword(staffMember.password);
        var body = {
            authorizationToken: this.authorizationService.getToken(),
            staffMember: staffMember
        };
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.routerConfig.serverAddress + '/addStaff', JSON.stringify(body), options)
            .catch(function (event) { return _this.helperMethods.handleError(event); });
    };
    return StaffManagementService;
}());
StaffManagementService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__authorization_service__["a" /* AuthorizationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__authorization_service__["a" /* AuthorizationService */]) === "function" && _b || Object])
], StaffManagementService);

var _a, _b;
//# sourceMappingURL=staff-management.service.js.map

/***/ }),

/***/ "./src/app/staff-management/staff-management.component.css":
/***/ (function(module, exports) {

module.exports = "#background {\r\n  min-height: 100vh;\r\n  min-width: 100vw;\r\n  padding-top: 100px;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n.container {\r\n  padding: 20px;\r\n}\r\n\r\n#addStaffModal {\r\n  max-width: 700px;\r\n}\r\n\r\n.deleteIcon {\r\n  cursor: pointer;\r\n}\r\n"

/***/ }),

/***/ "./src/app/staff-management/staff-management.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"background\" class=\"blue-grey lighten-5\">\n  <div class=\"container white z-depth-1\">\n    <div class=\"row\">\n      <div class=\"col s12\">\n        <h1 class=\"center-align\">Staff members</h1>\n      </div>\n    </div>\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <table>\n            <thead>\n              <tr>\n                <th>Forename</th>\n                <th>Lastname</th>\n                <th>Email</th>\n                <th>Department</th>\n                <th class=\"center-align\">Delete</th>\n              </tr>\n            </thead>\n            <tbody>\n            <tr *ngFor=\"let staffMember of staffMembers\">\n              <td>{{staffMember.foreName}}</td>\n              <td>{{staffMember.lastName}}</td>\n              <td>{{staffMember.email}}</td>\n              <td>{{staffMember.department}}</td>\n              <td class=\"center\">\n                <a materialize=\"tooltip\" class=\"modal-trigger tooltipped\" (click)=\"openDeleteStaffModal(staffMember)\" href=\"#deleteStaffModal\"\n                   data-delay=\"50\" data-tooltip=\"Delete staff member\" data-position=\"bottom\">\n                  <i class=\"material-icons deleteIcon blue-grey-text\">delete</i>\n                </a>\n              </td>\n            </tr>\n            <tr *ngIf=\"staffMembers && staffMembers.length == 0\">\n              <td colspan=\"4\" class=\"center\">No staff members in database!</td>\n            </tr>\n            <tr>\n              <td>\n                <a materialize=\"tooltip\" class=\"btn-floating waves-effect waves-light blue-grey tooltipped modal-trigger\"\n                   data-delay=\"50\" data-tooltip=\"Add a staff member\" data-position=\"right\" (click)=\"openNewStaffModal()\" href=\"#addStaffModal\">\n                  <i class=\"material-icons\">add</i>\n                </a>\n              </td>\n            </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- Delete staff member modal -->\n  <div id=\"deleteStaffModal\" class=\"modal bottom-sheet blue-grey lighten-5\" materialize=\"modal\" [materializeParams]=\"[{dismissible: true}]\" [materializeActions]=\"deleteStaffModalActions\">\n    <div class=\"modal-content\">\n      <h4>Are you sure, that you want to delete the staff member?</h4>\n      <p *ngIf=\"deleteStaffMember\">{{deleteStaffMember.foreName}} {{deleteStaffMember.lastName}} want be able to access the staff section if you proceed.</p>\n    </div>\n    <div class=\"modal-footer blue-grey lighten-5\">\n      <a class=\"modal-action modal-close btn-flat\">Abort</a>\n      <a class=\"modal-action modal-close waves-effect waves-red waves-darken-3 btn-flat\" (click)=\"deleteStaff(deleteStaffMember.id);\">Proceed</a>\n    </div>\n  </div>\n  <!-- Add staff member modal -->\n\n  <div id=\"addStaffModal\" class=\"modal blue-grey lighten-5\" materialize=\"modal\" [materializeParams]=\"[{dismissible: false}]\" [materializeActions]=\"newStaffModalActions\">\n    <div class=\"modal-content\">\n      <a class=\"modal-action modal-close waves-effect waves-red waves-darken-3 btn-flat\">\n        <i class=\"material-icons blue-grey-text\">cancel</i>\n      </a>\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <h4 class=\"center-align\">Add a new staff member</h4>\n          </div>\n        </div>\n        <form>\n          <div class=\"row no-margin\">\n            <div class=\"input-field col s12\">\n              <input id=\"forename\" type=\"text\" class=\"validate\" name=\"forename\" [(ngModel)]=\"newStaffMember.foreName\" required>\n              <label for=\"forename\">Forename</label>\n            </div>\n          </div>\n          <div class=\"row no-margin\">\n            <div class=\"input-field col s12\">\n              <input id=\"lastname\" type=\"text\" class=\"validate\" name=\"lastname\" [(ngModel)]=\"newStaffMember.lastName\" required>\n              <label for=\"lastname\">Lastname</label>\n            </div>\n          </div>\n          <div class=\"row no-margin\">\n            <div class=\"input-field col s12\">\n              <input id=\"email\" type=\"email\" class=\"validate\" name=\"email\" [(ngModel)]=\"newStaffMember.email\" required>\n              <label for=\"email\">Email</label>\n            </div>\n          </div>\n          <div class=\"row no-margin\">\n            <div class=\"input-field col s12\">\n              <input disabled id=\"password\" type=\"text\" class=\"validate\" name=\"password\" [(ngModel)]=\"newStaffMember.password\" required>\n              <label for=\"password\">Password</label>\n            </div>\n          </div>\n          <div class=\"row no-margin\">\n            <div class=\"input-field col s12\">\n              <input id=\"department\" type=\"text\" class=\"validate\" name=\"department\" [(ngModel)]=\"newStaffMember.department\" required>\n              <label for=\"department\">Department</label>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n    <div class=\"modal-footer blue-grey lighten-5\">\n      <a class=\"waves-effect modal-action modal-close waves-green waves-darken-3 btn-flat\" (click)=\"addStaff(newStaffMember);\">Add Staff</a>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/staff-management/staff-management.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StaffManagementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_objects_authorization__ = __webpack_require__("./src/app/data-objects/authorization.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper_methods__ = __webpack_require__("./src/app/helper-methods.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_staff_management_service__ = __webpack_require__("./src/app/services/staff-management.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StaffManagementComponent = (function () {
    function StaffManagementComponent(staffManagementService) {
        this.staffManagementService = staffManagementService;
        this.newStaffModalActions = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.deleteStaffModalActions = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    StaffManagementComponent.prototype.ngOnInit = function () {
        this.updateStaffMembers();
        this.generateNewStaffmember();
    };
    StaffManagementComponent.prototype.openNewStaffModal = function () {
        this.newStaffModalActions.emit({ action: 'modal', params: ['open'] });
    };
    StaffManagementComponent.prototype.openDeleteStaffModal = function (staffMember) {
        this.deleteStaffMember = staffMember;
        this.deleteStaffModalActions.emit({ action: 'modal', params: ['open'] });
    };
    StaffManagementComponent.prototype.addStaff = function (staffMember) {
        var _this = this;
        var success = true;
        this.staffManagementService.addStaffMember(staffMember)
            .catch(function (error) { success = false; return error; }).subscribe(function (response) {
            if (success) {
                _this.updateStaffMembers();
                _this.generateNewStaffmember();
            }
        });
    };
    StaffManagementComponent.prototype.deleteStaff = function (id) {
        var _this = this;
        this.staffManagementService.deleteStaffMember(id).subscribe(function (response) { return _this.updateStaffMembers(); });
    };
    //actions
    StaffManagementComponent.prototype.updateStaffMembers = function () {
        var _this = this;
        this.staffManagementService.listStaff().subscribe(function (response) { return _this.staffMembers = response; });
    };
    StaffManagementComponent.prototype.generateNewStaffmember = function () {
        this.newStaffMember = new __WEBPACK_IMPORTED_MODULE_1__data_objects_authorization__["a" /* StaffMember */]();
        this.newStaffMember.password = __WEBPACK_IMPORTED_MODULE_2__helper_methods__["a" /* HelperMethods */].generateInitialPassword();
    };
    return StaffManagementComponent;
}());
StaffManagementComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-staff-management',
        template: __webpack_require__("./src/app/staff-management/staff-management.component.html"),
        styles: [__webpack_require__("./src/app/staff-management/staff-management.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_staff_management_service__["a" /* StaffManagementService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_staff_management_service__["a" /* StaffManagementService */]) === "function" && _a || Object])
], StaffManagementComponent);

var _a;
//# sourceMappingURL=staff-management.component.js.map

/***/ }),

/***/ "./src/app/transportation-mode/transportation-mode.component.css":
/***/ (function(module, exports) {

module.exports = ".container {\r\n  padding: 20px;\r\n}\r\n\r\n.deleteIcon {\r\n  cursor: pointer;\r\n}\r\n"

/***/ }),

/***/ "./src/app/transportation-mode/transportation-mode.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col s12\">\n    <h1 class=\"center-align\">Transportation modes</h1>\n  </div>\n</div>\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col s12\">\n      <table>\n        <thead>\n        <tr>\n          <th>Modes</th>\n          <th class=\"center-align\">Delete</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr *ngFor=\"let mode of modes\">\n          <td>{{mode}}</td>\n          <td class=\"center\">\n            <a materialize=\"tooltip\" class=\"modal-trigger tooltipped\" (click)=\"openDeleteModeModal(mode)\" href=\"#deleteModeModal\"\n               data-delay=\"50\" data-tooltip=\"Delete mode\" data-position=\"bottom\">\n              <i class=\"material-icons deleteIcon blue-grey-text\">delete</i>\n            </a>\n          </td>\n        </tr>\n        <tr *ngIf=\"modes && modes.length == 0\">\n          <td colspan=\"4\" class=\"center\">No transportation mode in database!</td>\n        </tr>\n        <tr>\n          <td>\n            <a materialize=\"tooltip\" class=\"btn-floating waves-effect waves-light blue-grey tooltipped modal-trigger\"\n               data-delay=\"50\" data-tooltip=\"Add a transportation mode\" data-position=\"right\" (click)=\"openNewModeModal()\" href=\"#addModeModal\">\n              <i class=\"material-icons\">add</i>\n            </a>\n          </td>\n        </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n<!-- Delete mode modal -->\n<div id=\"deleteModeModal\" class=\"modal bottom-sheet blue-grey lighten-5\" materialize=\"modal\" [materializeParams]=\"[{dismissible: true}]\" [materializeActions]=\"deleteModeModalActions\">\n  <div class=\"modal-content\">\n    <h4>Are you sure, that you want to delete the mode?</h4>\n    <p *ngIf=\"delMode\">{{delMode}} can´t get selected anymore if you proceed.</p>\n  </div>\n  <div class=\"modal-footer blue-grey lighten-5\">\n    <a class=\"modal-mode modal-close btn-flat\">Abort</a>\n    <a class=\"modal-mode modal-close waves-effect waves-red waves-darken-3 btn-flat\" (click)=\"deleteMode(delMode);\">Proceed</a>\n  </div>\n</div>\n\n<!-- Add mode modal -->\n<div id=\"addModeModal\" class=\"modal blue-grey lighten-5\" materialize=\"modal\" [materializeParams]=\"[{dismissible: false}]\" [materializeActions]=\"newModeModalActions\">\n  <div class=\"modal-content\">\n    <a class=\"modal-mode modal-close waves-effect waves-red waves-darken-3 btn-flat\">\n      <i class=\"material-icons blue-grey-text\">cancel</i>\n    </a>\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h4 class=\"center-align\">Add a new transportation mode</h4>\n        </div>\n      </div>\n      <form>\n        <div class=\"row no-margin\">\n          <div class=\"input-field col s12\">\n            <input id=\"mode\" type=\"text\" class=\"validate\" name=\"mode\" [(ngModel)]=\"newMode\" required>\n            <label for=\"mode\">Transportation mode</label>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n  <div class=\"modal-footer blue-grey lighten-5\">\n    <a class=\"waves-effect modal-mode modal-close waves-green waves-darken-3 btn-flat\" (click)=\"addMode(newMode);\">Add transportation mode</a>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/transportation-mode/transportation-mode.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransportationModeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_data_management_service__ = __webpack_require__("./src/app/services/data-management.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TransportationModeComponent = (function () {
    function TransportationModeComponent(dataManagementService) {
        this.dataManagementService = dataManagementService;
        this.modes = [];
        this.newModeModalActions = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.deleteModeModalActions = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    TransportationModeComponent.prototype.ngOnInit = function () {
        this.updateModes();
        this.newMode = '';
    };
    TransportationModeComponent.prototype.openDeleteModeModal = function (action) {
        this.delMode = action;
        this.deleteModeModalActions.emit({ action: 'modal', params: ['open'] });
    };
    TransportationModeComponent.prototype.openNewModeModal = function () {
        this.newModeModalActions.emit({ action: 'modal', params: ['open'] });
    };
    TransportationModeComponent.prototype.addMode = function (action) {
        var _this = this;
        this.dataManagementService.addTransportationMode(action).subscribe(function (response) {
            _this.updateModes();
            _this.newMode = '';
        });
    };
    TransportationModeComponent.prototype.deleteMode = function (action) {
        var _this = this;
        this.dataManagementService.removeTransportationMode(action).subscribe(function (response) { return _this.updateModes(); });
    };
    //actions
    TransportationModeComponent.prototype.updateModes = function () {
        var _this = this;
        this.dataManagementService.listTransportationModes().subscribe(function (response) { return _this.modes = response; });
    };
    return TransportationModeComponent;
}());
TransportationModeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-transportation-mode',
        template: __webpack_require__("./src/app/transportation-mode/transportation-mode.component.html"),
        styles: [__webpack_require__("./src/app/transportation-mode/transportation-mode.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_data_management_service__["a" /* DataManagementService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_data_management_service__["a" /* DataManagementService */]) === "function" && _a || Object])
], TransportationModeComponent);

var _a;
//# sourceMappingURL=transportation-mode.component.js.map

/***/ }),

/***/ "./src/assets/config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ROUTER_CONFIG; });
var ROUTER_CONFIG = {
    serverAddress: 'http://localhost:2018',
    allowedUserRoutes: [
        '^$',
        '^/login'
    ],
    allowedAdminRoutes: [
        '.*'
    ],
    allowedStaffRoutes: [
        '^$',
        '^/login',
        '^/parcelManagement'
    ]
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map