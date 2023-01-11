import { CategoryInMemoryRepository } from "category/infra/repository/category_in_memory.repository";
import { CreateCategoryUseCase } from "category/application/usecases/create_category.usecase";

describe("CreateCategoryUseCase", () => {
  let categoryRepository: CategoryInMemoryRepository;
  let useCase: CreateCategoryUseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase(categoryRepository);
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
      const spy = jest.spyOn(categoryRepository, "insert");
      const result = await useCase.execute(input);
      expect(spy).toHaveBeenCalledTimes(1);

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
