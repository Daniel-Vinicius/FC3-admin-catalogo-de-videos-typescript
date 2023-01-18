import { CategoryInMemoryRepository } from "@category/infra/db";
import { CreateCategoryUseCase } from "@category/application/usecases/create_category.usecase";

describe("CreateCategoryUseCase Unit Tests", () => {
  let categoryRepository: CategoryInMemoryRepository;
  let useCase: CreateCategoryUseCase.UseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase.UseCase(categoryRepository);
  });

  const testCases = [
    {
      name: "with required parameters",
      input: { name: "Food" },
      output: {
        name: "Food",
        description: null as any,
        is_active: true,
      },
    },
    {
      name: "with all parameters",
      input: { name: "Food", description: "All about food", is_active: true },
      output: {
        name: "Food",
        description: "All about food",
        is_active: true,
      },
    },
    {
      name: "with inactive category",
      input: { name: "Food", description: "All about food", is_active: false },
      output: {
        name: "Food",
        description: "All about food",
        is_active: false,
      },
    },
  ];

  testCases.forEach(({ name, input, output }) => {
    test(name, async () => {
      const spyInsert = jest.spyOn(categoryRepository, "insert");
      const result = await useCase.execute(input);
      expect(spyInsert).toHaveBeenCalledTimes(1);

      const { id, created_at } = categoryRepository.items.find(
        (item) => item.name === output.name
      );

      expect(result).toEqual({
        id: id,
        name: output.name,
        description: output.description,
        is_active: output.is_active,
        created_at: created_at,
      });
    });
  });
});
