import { CategoryInMemoryRepository } from "@category/infra/repository/category_in_memory.repository";
import { UpdateCategoryUseCase } from "@category/application/usecases/update_category.usecase";
import { NotFoundError } from "@seedwork/domain/errors/not_found.error";
import { Category } from "@category/domain/entities/category";

describe("UpdateCategoryUseCase Unit Tests", () => {
  let categoryRepository: CategoryInMemoryRepository;
  let useCase: UpdateCategoryUseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase(categoryRepository);
  });

  it("should throws error when category not found", async () => {
    const id = "fake-id";

    expect(
      async () => await useCase.execute({ id, name: "updated" })
    ).rejects.toThrowError(
      new NotFoundError(`Entity Not Found using ID ${id}`)
    );
  });

  it("should update a category", async () => {
    const category = new Category({ name: "Horror" });
    categoryRepository.items = [category];

    const arrange = [
      {
        input: {
          id: category.id,
          name: "Comedy",
          description: "Category updated",
          is_active: false,
        },
        outputExpected: {
          id: category.id,
          name: "Comedy",
          description: "Category updated",
          is_active: false,
          created_at: category.created_at,
        },
      },
      {
        input: {
          id: category.id,
          name: "Comedy",
          is_active: true,
        },
        outputExpected: {
          id: category.id,
          name: "Comedy",
          description: null as any,
          is_active: true,
          created_at: category.created_at,
        },
      },
      {
        input: {
          id: category.id,
          name: "Comedy Updated",
          description: "Some Description",
        },
        outputExpected: {
          id: category.id,
          name: "Comedy Updated",
          description: "Some Description",
          is_active: true,
          created_at: category.created_at,
        },
      },
    ];

    for (const variation of arrange) {
      const spyUpdate = jest.spyOn(categoryRepository, "update");
      const { input, outputExpected } = variation;

      const output = await useCase.execute(input);

      expect(output).toEqual(outputExpected);
      expect(spyUpdate).toHaveBeenCalledWith(category);
    }
  });
});
