// import Car from '../Domains/Car';

export default interface ICar {
  id?: string;
  model: string;
  year: number;
  color: string;
  status?: boolean;
  buyValue: number;
  doorsQty: number;
  seatsQty: number;
}

// export interface ICarService {
//   newCarDomain(car: ICar | null): Car | null
//   addNewCar(car: ICar): any
// }