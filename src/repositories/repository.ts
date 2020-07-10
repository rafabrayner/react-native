import api from './../services/api';

export default abstract class Repository<T> {
  protected api = api;

  public abstract create(data: any): Promise<T>;
  public abstract read(queryParams?: any): Promise<T[]>;
  public abstract update(id: string, data: any): Promise<T>;
  public abstract delete(id: string): Promise<any>;
}
