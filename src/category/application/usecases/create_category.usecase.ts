import { UseCase } from "@seedwork/application/usecase";
import { Category } from "@category/domain/entities/category";
import { CategoryRepository } from "@category/domain/repository/category.repository";
import {
  CategoryOutputDTO,
  CategoryOutputMapper,
} from "@category/application/dtos/category_output.dto";

export type Input = {
  name: string;
  description?: string;
  is_active?: boolean;
};

export type Output = CategoryOutputDTO;

export class CreateCategoryUseCase implements UseCase<Input, Output> {
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
