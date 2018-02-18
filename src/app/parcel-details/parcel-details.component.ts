import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Parcel, Station} from "../parcel-management";
import {ParcelManagementService} from "../parcel-management.service";
import 'rxjs/add/operator/switchMap';
import MapOptions = google.maps.MapOptions;

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

  public onMapReady(map): void {
    this.loadPositions();
  }

  public onMarkerInit(marker): void {
    const bounds = new google.maps.LatLngBounds();
    this.positions.forEach(marker => bounds.extend(marker));
    this.mapComponent.map.fitBounds(bounds);
  }

  public parseActionDescription(station: Station): string {
    let parsedActionDescription: string = station.actionDescription;
    parsedActionDescription = parsedActionDescription.replace("#Location#", station.location.city.name + ', ' + station.location.country);
    parsedActionDescription = parsedActionDescription.replace("#Transport#", station.transportationMode);
    parsedActionDescription = parsedActionDescription.replace("#DeparturePerson#", this.parcel.departurePersonDetails);
    parsedActionDescription = parsedActionDescription.replace("#DestinationPerson#", this.parcel.destinationPersonDetails);
    parsedActionDescription = parsedActionDescription.replace("#NoteOrPerson#",
      station.notes ? station.notes : this.parcel.departurePersonDetails);
    return parsedActionDescription;
  }

  private loadPositions(): void {
    if (!google) { return; }
    this.positions = [];
    this.buildAddressArrayForStations();
    this.addresses.forEach(address => {
      this.mapComponent.geoCoder.geocode({address: address})
        .map(response => response[0])
        .subscribe(response =>
          this.positions.push(new google.maps.LatLng(response.geometry.location.lat(), response.geometry.location.lng())));
    });
  }

  private buildAddressArrayForStations(): void {
    this.addresses = [];
    this.addresses.push(this.parcel.departure.road + ', ' + this.parcel.departure.city.name + ' ' + this.parcel.departure.country);
    this.parcel.stations.forEach(station =>
      this.addresses.push(station.location.road + ', ' + station.location.city.name + ' ' + station.location.country));
    this.addresses.push(this.parcel.destination.road + ', ' + this.parcel.destination.city.name + ' ' + this.parcel.destination.country);
  }

}
