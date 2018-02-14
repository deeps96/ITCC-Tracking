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
