export class Site {
  address: string;
  zipCode: string
  city: string;

  constructor(address: string, zipCode: string, city: string) {
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
  }
}
