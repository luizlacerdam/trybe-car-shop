export default interface IMotocycle {
  id?: string;
  model: string;
  year: number;
  color: string;
  status?: boolean;
  buyValue: number;
  doorsQty: number;
  seatsQty: number;
  category: 'Street' | 'Custom' | 'Trail';
  engineCapacity: number;
}
