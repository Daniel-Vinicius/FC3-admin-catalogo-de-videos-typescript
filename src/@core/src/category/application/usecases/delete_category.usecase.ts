import { UseCase as DefaultUseCase } from "@seedwork/application/usecase";
import { CategoryRepository } from "@category/domain/repository/category.repository";

export namespace DeleteCategoryUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private categoryRepository: CategoryRepository.Repository) {}

    async execute({ id }: Input): Promise<Output> {
      await this.categoryRepository.delete(id);
    }
  }
}
