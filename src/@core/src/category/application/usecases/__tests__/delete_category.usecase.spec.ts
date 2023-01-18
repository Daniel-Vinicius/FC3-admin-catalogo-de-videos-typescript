import { CategoryInMemoryRepository } from "@category/infra/db";
import { DeleteCategoryUseCase } from "@category/application/usecases/delete_category.usecase";
import { NotFoundError } from "@seedwork/domain/errors/not_found.error";
import { Category } from "@category/domain/entities/category";

describe("DeleteCategoryUseCase Unit Tests", () => {
  let categoryRepository: CategoryInMemoryRepository;
  let useCase: DeleteCategoryUseCase.UseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase.UseCase(categoryRepository);
  });

  it("should throws error when category not found", async () => {
    const spyDelete = jest.spyOn(categoryRepository, "delete");
    const id = "fake-id";

    expect(async () => await useCase.execute({ id })).rejects.toThrowError(
      new NotFoundError(`Entity Not Found using ID ${id}`)
    );

    expect(spyDelete).toHaveBeenCalledTimes(1);
  });

  it("should deletes a category", async () => {
    const spyDelete = jest.spyOn(categoryRepository, "delete");
    const category = new Category({ name: "Movie" });
    categoryRepository.items = [category];

    await useCase.execute({ id: category.id });

    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(categoryRepository.items).toHaveLength(0);
  });
});
