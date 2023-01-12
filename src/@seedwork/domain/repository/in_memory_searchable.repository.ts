import { Entity } from "@seedwork/domain/entity/entity";
import { InMemoryRepository } from "@seedwork/domain/repository/in_memory.repository";

import {
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult,
  SortDirection,
} from "@seedwork/domain/repository/repository.contracts";

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E>
{
  sortableFields: string[] = [];

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

  protected async applySort(
    items: E[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Promise<E[]> {
    const isSortable = sort && this.sortableFields.includes(sort);

    function doSort() {
      return [...items].sort((a, b) => {
        if (a.props[sort] < b.props[sort]) {
          return sort_dir === "asc" ? -1 : 1;
        }

        if (a.props[sort] > b.props[sort]) {
          return sort_dir === "asc" ? 1 : -1;
        }

        return 0;
      });
    }

    if (isSortable) {
      return doSort();
    }

    return items;
  }

  protected async applyPaginate(
    items: E[],
    page: SearchParams["page"],
    per_page: SearchParams["per_page"]
  ): Promise<E[]> {
    const start = (page - 1) * per_page; // 1 * 15 = 15
    const limit = start + per_page; // 15 + 15 = 30

    return items.slice(start, limit);
  }
}
