export interface Hive {
  _id: string;
  name: string;
  description: string;
  beekeeper: string;
  rpi: object;
  patrons: Array<any>;
}