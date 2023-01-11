import { Entity } from "../entity/entity";
import { NotFoundError } from "../errors/not_found.error";
import { UniqueEntityId } from "../value-objects/unique_entity_id.vo";
import {
  RepositoryInterface,
  SearchableRepositoryInterface,
} from "./repository.contracts";

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    const entityFound = await this._get(entity.id);
    const index = this.items.findIndex((i) => i.id === entityFound.id);
    this.items[index] = entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    const entityFound = await this._get(_id);
    const index = this.items.findIndex((i) => i.id === entityFound.id);
    this.items.splice(index, 1);
  }

  protected async _get(id: string): Promise<E> {
    const entity: E = this.items.find((item) => item.id === id);

    if (!entity) {
      throw new NotFoundError(`Entity Not Found using ID ${id}`);
    }

    return entity;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  search(props: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}