import { InMemorySearchableRepository } from "@seedwork/domain/repository/in_memory_searchable.repository";
import { Category } from "category/domain/entities/category";
import { CategoryRepository } from "category/domain/repository/category.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ["name"];

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
}
