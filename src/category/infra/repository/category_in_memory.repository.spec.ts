import { Category } from "category/domain/entities/category";
import { CategoryRepository } from "category/domain/repository/category.repository";
import { CategoryInMemoryRepository } from "./category_in_memory.repository";

describe("CategoryInMemoryRepository Tests", () => {
  let repository: CategoryInMemoryRepository;
  beforeEach(() => (repository = new CategoryInMemoryRepository()));

  it("should filter by name", async () => {
    const items = [
      new Category({ name: "Romantic Comedy" }),
      new Category({ name: "Horror Comedy" }),
      new Category({ name: "Anarchic Comedy" }),
      new Category({ name: "Action Comedy" }),
      new Category({ name: "Black Comedy" }),
      new Category({ name: "Documentary" }),
    ];

    repository.items = items;

    const categoriesFiltered = await repository.search(
      new CategoryRepository.SearchParams({
        filter: "Comedy",
      })
    );

    expect(categoriesFiltered.total).toBe(5);
  });

  it("should sort by created_at if sort param is null", async () => {
    const items = [
      new Category({ name: "Romantic Comedy" }),
      new Category({ name: "Horror Comedy" }),
      new Category({
        name: "Anarchic Comedy",
        created_at: new Date(1673022403297),
      }),
      new Category({ name: "Action Comedy" }),
      new Category({ name: "Black Comedy" }),
      new Category({ name: "Documentary" }),
    ];

    repository.items = items;

    const categoriesFiltered = await repository.search(
      new CategoryRepository.SearchParams()
    );

    expect(categoriesFiltered.items[0]).toStrictEqual(items[2]);
  });

  it("should sort by name", async () => {
    const items = [
      new Category({ name: "Romantic Comedy" }),
      new Category({ name: "Horror Comedy" }),
      new Category({ name: "Black Comedy" }),
      new Category({ name: "Documentary" }),
    ];

    repository.items = items;

    const categoriesSorted = await repository.search(
      new CategoryRepository.SearchParams({
        sort: "name",
      })
    );

    expect(categoriesSorted.items[0]).toStrictEqual(items[2]);
    expect(categoriesSorted.items[1]).toStrictEqual(items[3]);
    expect(categoriesSorted.items[2]).toStrictEqual(items[1]);
    expect(categoriesSorted.items[3]).toStrictEqual(items[0]);
  });
});
