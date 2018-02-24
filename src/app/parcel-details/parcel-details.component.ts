import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Parcel, Station} from "../data-objects/parcel-management";
import {ParcelManagementService} from "../services/parcel-management.service";
import 'rxjs/add/operator/switchMap';
import MapOptions = google.maps.MapOptions;
import {HelperMethods} from "../helper-methods";
import {Observable} from "rxjs/Observable";
import GeocoderResult = google.maps.GeocoderResult;
import "rxjs/add/observable/forkJoin";
import "rxjs/add/observable/of";
import {AuthorizationService} from "../services/authorization.service";
import "rxjs/add/operator/zip";

declare var google: any;

@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.component.html',
  styleUrls: ['./parcel-details.component.css']
})
export class ParcelDetailsComponent implements OnInit {

  @ViewChild('map')
  private mapComponent: any;

  public addresses: string[];
  private center = {lat: 52.040055, lng: 8.540920};
  public mapOptions: MapOptions = {
    center: this.center,
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
  public parcel: Parcel;
  public positions: any[];
  public showAddStationButton: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private authorizationService: AuthorizationService, private parcelManagementService: ParcelManagementService) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.parcelManagementService.getParcel(params.get('trackingNumber')))
      .catch(error => {this.router.navigate(['']); return []; })
      .subscribe(parcel => {
        parcel.stations = parcel.stations.reverse();
        this.parcel = parcel;
        this.loadPositions();
      });
    if (this.authorizationService.isAuthenticated()) {
      Observable.zip(this.authorizationService.isAdmin(), this.authorizationService.isStaff()).subscribe(
        ([isAdmin, isStaff]) => this.showAddStationButton = (isAdmin || isStaff));
    }
  }

  public onMapReady(map): void {
    this.loadPositions();
  }

  public onMarkerInit(marker): void {
    const bounds = new google.maps.LatLngBounds();
    this.positions.forEach(marker => bounds.extend(marker));
    this.mapComponent.map.fitBounds(bounds);
  }

  public parseActionDescription(station: Station): string {
    return HelperMethods.parseActionDescription(this.parcel, station);
  }

  public convertToDate(timestamp: number) {
    return new Date(timestamp);
  }

  public filterPositions(positions: any[]) {
    return positions.filter((position, index) => index > 0 && index < positions.length - 1)
  }

  private loadPositions(): void {
    if (typeof(google) == 'undefined' || !this.mapComponent) { return; }
    let positions = [];
    let addresses = this.buildAddressArrayForStations();
    let geoObservables = addresses
      .map(address => this.mapComponent.geoCoder.geocode({address: address})
        .catch(error => Observable.of({}))
        .map(response => (response.length > 0) ? response[0] : []));
    Observable.forkJoin(geoObservables)
      .subscribe(responses => {
        responses.forEach((response: GeocoderResult) => {
          if (response.geometry) {
            positions.push(new google.maps.LatLng(response.geometry.location.lat(), response.geometry.location.lng()));
          }
        });
        this.positions = positions;
        this.addresses = addresses;
      });
  }

  private buildAddressArrayForStations(): string[] {
    let addresses = [];
    addresses.push(this.parcel.departure.road + ', ' + this.parcel.departure.city.name + ' ' + this.parcel.departure.country);
    this.parcel.stations.forEach(station =>
      addresses.push(station.location.road + ', ' + station.location.city.name + ' ' + station.location.country));
    addresses.push(this.parcel.destination.road + ', ' + this.parcel.destination.city.name + ' ' + this.parcel.destination.country);
    addresses = addresses.filter(address => address);
    return addresses;
  }

}
