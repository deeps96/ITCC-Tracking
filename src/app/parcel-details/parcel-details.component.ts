import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Parcel} from "../parcel-management";
import {ParcelManagementService} from "../parcel-management.service";
import 'rxjs/add/operator/switchMap';
import MapOptions = google.maps.MapOptions;
import LatLngLiteral = google.maps.LatLngLiteral;

@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.component.html',
  styleUrls: ['./parcel-details.component.css']
})
export class ParcelDetailsComponent implements OnInit {

  @ViewChild('map')
  private mapComponent: any;

  private center = {lat: 52.040055, lng: 8.540920};
  public mapOptions: MapOptions = {
    center: this.center,
    maxZoom: 17,
    minZoom: 4,
    zoom: 13,
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]
  };
  public parcel: Parcel;
  public positions: LatLngLiteral[];

  constructor(private route: ActivatedRoute, private parcelManagementService: ParcelManagementService) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.parcelManagementService.getParcel(params.get('trackingNumber')))
      .subscribe(parcel => {
        this.parcel = parcel;
        this.loadPositions();
      });
  }

  public onMarkerInit(marker): void {
    const bounds = new google.maps.LatLngBounds();
    this.positions.forEach(marker => bounds.extend(marker));
    this.mapComponent.map.fitBounds(bounds);
  }

  private loadPositions(): void {
    this.positions = [];
    let addresses: string[] = this.buildAddressArrayForStations();
    addresses.forEach(address => {
      this.mapComponent.geoCoder.geocode({address: address})
        .map(response => response[0])
        .subscribe(response =>
          this.positions.push({lat: response.geometry.location.lat(), lng: response.geometry.location.lng()}));
    });
  }

  private buildAddressArrayForStations(): string[] {
    let addresses: string[] = [];
    addresses.push(this.parcel.departure.road + ', ' + this.parcel.departure.city.name + ' ' + this.parcel.departure.country);
    this.parcel.stations.forEach(station =>
      addresses.push(station.location.road + ', ' + station.location.city.name + ' ' + station.location.country));
    addresses.push(this.parcel.destination.road + ', ' + this.parcel.destination.city.name + ' ' + this.parcel.destination.country);
    return addresses;
  }

}
