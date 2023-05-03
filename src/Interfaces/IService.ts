export default interface IService<T, U> {
  create(vehicle: T): Promise<U | null>
  getAll():Promise<(U | null)[]>
  getById(id: string):Promise<U | null>
  update(id: string, body: T): Promise<U | null>
}