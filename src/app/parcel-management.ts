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
  handOverTimestamp: string;
  trackingNumber?: string;
  parcelTypeName: string;

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
}
