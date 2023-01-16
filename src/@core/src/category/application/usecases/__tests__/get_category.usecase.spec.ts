import { CategoryInMemoryRepository } from "@category/infra/repository/category_in_memory.repository";
import { GetCategoryUseCase } from "@category/application/usecases/get_category.usecase";
import { NotFoundError } from "@seedwork/domain/errors/not_found.error";
import { Category } from "@category/domain/entities/category";

describe("GetCategoryUseCase Unit Tests", () => {
  let categoryRepository: CategoryInMemoryRepository;
  let useCase: GetCategoryUseCase.UseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase.UseCase(categoryRepository);
  });

  it("should throws error when category not found", async () => {
    const spyFindById = jest.spyOn(categoryRepository, "findById");
    const id = "fake-id";

    expect(async () => await useCase.execute({ id })).rejects.toThrowError(
      new NotFoundError(`Entity Not Found using ID ${id}`)
    );

    expect(spyFindById).toHaveBeenCalledTimes(1);
  });

  it("should returns a category", async () => {
    const spyFindById = jest.spyOn(categoryRepository, "findById");
    const category = new Category({ name: "Movie" });
    categoryRepository.items = [category];

    const categoryFound = await useCase.execute({ id: category.id });

    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(categoryFound).toStrictEqual(category.toJSON());
  });
});
