import { Entity } from "../entity/entity";
import { NotFoundError } from "../errors/not_found.error";
import { UniqueEntityId } from "../value-objects/unique_entity_id.vo";
import {
  RepositoryInterface,
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult,
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
  implements SearchableRepositoryInterface<E>
{
  async search(props: SearchParams): Promise<SearchResult<E>> {
    const { filter, sort, sort_dir, page, per_page } = props;

    const itemsFiltered = await this.applyFilter(this.items, filter);
    const itemsSorted = await this.applySort(itemsFiltered, sort, sort_dir);
    const itemsPaginated = await this.applyPaginate(
      itemsSorted,
      page,
      per_page
    );

    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      current_page: page,
      per_page,
      sort,
      sort_dir,
      filter,
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter: string | null
  ): Promise<E[]>;

  protected abstract applySort(
    items: E[],
    sort: string | null,
    sort_dir: string | null
  ): Promise<E[]>;

  protected abstract applyPaginate(
    items: E[],
    page: SearchParams["page"],
    per_page: SearchParams["per_page"]
  ): Promise<E[]>;
}
