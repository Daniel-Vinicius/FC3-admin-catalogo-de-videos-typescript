import { CategoryInMemoryRepository } from "@category/infra/repository/category_in_memory.repository";
import { ListCategoriesUseCase } from "@category/application/usecases/list_categories.usecase";
import { Category } from "@category/domain/entities/category";

describe("ListCategoriesUseCase Unit Tests", () => {
  let categoryRepository: CategoryInMemoryRepository;
  let useCase: ListCategoriesUseCase.UseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase.UseCase(categoryRepository);
  });

  it("should returns output using empty input with categories ordered by created_at", async () => {
    const spySearch = jest.spyOn(categoryRepository, "search");

    const categories = [
      new Category({ name: "test 1" }),
      new Category({
        name: "test 2",
        created_at: new Date(1673022403297),
      }),
    ];

    categoryRepository.items = categories;

    const output = await useCase.execute({});

    expect(spySearch).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      items: [...categories].reverse().map((c) => c.toJSON()),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
      sort: null,
      sort_dir: null,
      filter: null,
    });
  });

  it("should returns output using pagination, sort and filter", async () => {
    const categories = [
      new Category({ name: "a" }),
      new Category({ name: "AAA" }),
      new Category({ name: "AaA" }),
      new Category({ name: "b" }),
      new Category({ name: "c" }),
    ];

    categoryRepository.items = categories;

    const arrange = [
      {
        params: {
          page: 1,
          per_page: 2,
          sort: "name",
          filter: "a",
        },
        outputExpected: {
          items: [categories[1].toJSON(), categories[2].toJSON()],
          total: 3,
          current_page: 1,
          per_page: 2,
          last_page: 2,
          sort: "name",
          sort_dir: "asc",
          filter: "a",
        },
      },
      {
        params: {
          page: 2,
          per_page: 2,
          sort: "name",
          filter: "a",
        },
        outputExpected: {
          items: [categories[0].toJSON()],
          total: 3,
          current_page: 2,
          per_page: 2,
          last_page: 2,
          sort: "name",
          sort_dir: "asc",
          filter: "a",
        },
      },
      {
        params: {
          page: 1,
          per_page: 2,
          sort: "name",
          sort_dir: "desc",
          filter: "a",
        },
        outputExpected: {
          items: [categories[0].toJSON(), categories[2].toJSON()],
          total: 3,
          current_page: 1,
          per_page: 2,
          last_page: 2,
          sort: "name",
          sort_dir: "desc",
          filter: "a",
        },
      },
    ];

    for (const variation of arrange) {
      const { params, outputExpected } = variation;
      const output = await useCase.execute(params as any);
      expect(output).toEqual(outputExpected);
    }
  });
});
