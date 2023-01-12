import { UseCase } from "@seedwork/application/usecase";
import { CategoryRepository } from "@category/domain/repository/category.repository";

export type Input = {
  id: string;
};

export type Output = void;

export class DeleteCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute({ id }: Input): Promise<Output> {
    await this.categoryRepository.delete(id);
  }
}
