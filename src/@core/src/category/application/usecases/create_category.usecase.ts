import { UseCase as DefaultUseCase } from "@seedwork/application/usecase";
import { Category, CategoryRepository } from "@category/domain";

import {
  CategoryOutputDTO,
  CategoryOutputMapper,
} from "@category/application/dtos/category_output.dto";

export namespace CreateCategoryUseCase {
  export type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
  };

  export type Output = CategoryOutputDTO;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private categoryRepository: CategoryRepository.Repository) {}

    async execute({ name, description, is_active }: Input): Promise<Output> {
      const entity = new Category({
        name,
        description,
        is_active,
      });

      await this.categoryRepository.insert(entity);

      return CategoryOutputMapper.toOutputDTO(entity);
    }
  }
}
