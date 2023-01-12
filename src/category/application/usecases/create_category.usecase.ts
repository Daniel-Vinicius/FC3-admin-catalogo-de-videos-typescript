import { UseCase } from "@seedwork/application/usecase";
import { Category } from "@category/domain/entities/category";
import { CategoryRepository } from "@category/domain/repository/category.repository";
import {
  CategoryOutputDTO,
  CategoryOutputMapper,
} from "@category/application/dtos/category_output.dto";

export type InputCreateCategoryUseCase = {
  name: string;
  description?: string;
  is_active?: boolean;
};

export type OutputCreateCategoryUseCase = CategoryOutputDTO;

export class CreateCategoryUseCase
  implements UseCase<InputCreateCategoryUseCase, OutputCreateCategoryUseCase>
{
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute({
    name,
    description,
    is_active,
  }: InputCreateCategoryUseCase): Promise<OutputCreateCategoryUseCase> {
    const entity = new Category({
      name,
      description,
      is_active,
    });

    await this.categoryRepository.insert(entity);

    return CategoryOutputMapper.toOutputDTO(entity);
  }
}
