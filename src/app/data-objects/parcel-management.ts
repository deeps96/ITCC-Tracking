export class Location {
  city: City;
  country: string;
  road: string;
  constructor() {
    this.city = new City();
  }
}

export class City {
  name: string;
  zipCode: string;
}

export class Parcel {
  stations?: Station[];
  departure: Location;
  destination: Location;
  trackingNumber?: string;
  parcelTypeName: string;
  departurePersonDetails: string;
  destinationPersonDetails: string;
  handOverTimestamp: number;

  constructor() {
    this.departure = new Location();
    this.destination = new Location();
  }
}

export class Station {
  location: Location;
  actionDescription: string;
  notes: string;
  transportationMode: string;
  timestamp: number;

  constructor() {
    this.location = new Location();
  }
}
