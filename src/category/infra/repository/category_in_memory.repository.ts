import { InMemorySearchableRepository } from "@seedwork/domain/repository/in_memory_searchable.repository";
import { SortDirection } from "@seedwork/domain/repository/repository.contracts";
import { Category } from "category/domain/entities/category";
import { CategoryRepository } from "category/domain/repository/category.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: Category[],
    filter: CategoryRepository.Filter
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    const itemsFiltered = items.filter((item) => {
      const { name } = item.props;
      return name.toLowerCase().includes(filter.toLowerCase());
    });

    return itemsFiltered;
  }

  protected async applySort(
    items: Category[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Promise<Category[]> {
    if (!sort) {
      return super.applySort(items, "created_at", "asc");
    }

    return super.applySort(items, sort, sort_dir);
  }
}
