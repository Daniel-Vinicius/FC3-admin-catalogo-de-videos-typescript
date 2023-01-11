import { Entity } from "@seedwork/domain/entity/entity";
import { InMemorySearchableRepository } from "../in_memory_searchable.repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ["name"];

  protected async applyFilter(
    items: StubEntity[],
    filter: string
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }

    const itemsFiltered = items.filter((item) => {
      const { name, price } = item.props;

      return (
        name.toLowerCase().includes(filter.toLowerCase()) ||
        price.toString() === filter
      );
    });

    return itemsFiltered;
  }
}

describe("InMemorySearchableRepository Unit Tests", () => {
  let repository: StubInMemorySearchableRepository;
  beforeEach(() => (repository = new StubInMemorySearchableRepository()));

  describe("applyFilter method", () => {});

  describe("applySort method", () => {});

  describe("applyPaginate method", () => {});

  describe("search method", () => {});
});
