import { UseCase } from "@seedwork/application/usecase";
import { CategoryRepository } from "@category/domain/repository/category.repository";

export type InputDeleteCategoryUseCase = {
  id: string;
};

export type OutputDeleteCategoryUseCase = void;

export class DeleteCategoryUseCase
  implements UseCase<InputDeleteCategoryUseCase, OutputDeleteCategoryUseCase>
{
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute({
    id,
  }: InputDeleteCategoryUseCase): Promise<OutputDeleteCategoryUseCase> {
    await this.categoryRepository.delete(id);
  }
}
