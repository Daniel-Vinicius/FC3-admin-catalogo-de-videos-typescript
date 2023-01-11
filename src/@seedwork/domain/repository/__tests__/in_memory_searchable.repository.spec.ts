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
    filter: string | null
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

  describe("applyFilter method", () => {
    it("should not filter items when filter param is null", async () => {
      const items = [new StubEntity({ name: "Shirt", price: 20 })];

      const spyFilterMethod = jest.spyOn(items, "filter");
      const itemsFiltered = await repository["applyFilter"](items, null);

      expect(spyFilterMethod).not.toHaveBeenCalled();
      expect(itemsFiltered).toStrictEqual(items);
    });

    it("should filter using a filter param", async () => {
      const items = [
        new StubEntity({ name: "SHIRT", price: 20 }),
        new StubEntity({ name: "shirt", price: 20 }),
        new StubEntity({ name: "fake", price: 0 }),
      ];

      const spyFilterMethod = jest.spyOn(items, "filter");
      let itemsFiltered = await repository["applyFilter"](items, "SHIRT");

      expect(spyFilterMethod).toHaveBeenCalled();
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);

      itemsFiltered = await repository["applyFilter"](items, "20");
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);

      itemsFiltered = await repository["applyFilter"](items, "no-filter");
      expect(itemsFiltered.length).toEqual(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(3);
    });
  });

  describe("applySort method", () => {});

  describe("applyPaginate method", () => {});

  describe("search method", () => {});
});
