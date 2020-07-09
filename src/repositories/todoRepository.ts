import api from './../services/api';
import Repository from './repository';
import {Todo} from './../models/todo';

class TodoRepository extends Repository<Todo> {
  protected path = '/todos';

  constructor() {
    super();
  }

  public async read(): Promise<Todo[]> {
    return (await api.get<Todo[]>(this.path)).data;
  }

  public async getById(id: string): Promise<Todo> {
    return (await api.get(`${this.path}/${id}`)).data;
  }

  public async create(todoCreateDto: {
    description: string;
    done: boolean;
  }): Promise<Todo> {
    return (await api.post<Todo>(this.path, todoCreateDto)).data;
  }

  public async update(todo: Todo): Promise<Todo> {
    return (await this.api.put<Todo>(`${this.path}/${todo._id}`, todo)).data;
  }

  public async delete(id: string) {
    return (await this.api.delete(`${this.path}/${id}`)).data;
  }
}

const todoRepository = new TodoRepository();

export default todoRepository;
