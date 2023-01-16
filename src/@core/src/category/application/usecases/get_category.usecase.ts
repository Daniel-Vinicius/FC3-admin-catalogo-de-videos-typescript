import { UseCase as DefaultUseCase } from "@seedwork/application/usecase";
import { CategoryRepository } from "@category/domain/repository/category.repository";

import {
  CategoryOutputDTO,
  CategoryOutputMapper,
} from "@category/application/dtos/category_output.dto";

export namespace GetCategoryUseCase {
  export type Input = {
    id: string;
  };

  export type Output = CategoryOutputDTO;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private categoryRepository: CategoryRepository.Repository) {}

    async execute({ id }: Input): Promise<Output> {
      const category = await this.categoryRepository.findById(id);
      return CategoryOutputMapper.toOutputDTO(category);
    }
  }
}
