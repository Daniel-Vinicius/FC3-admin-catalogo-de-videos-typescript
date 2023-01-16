import { UseCase } from "@seedwork/application/usecase";
import { CategoryRepository } from "@category/domain/repository/category.repository";
import {
  CategoryOutputDTO,
  CategoryOutputMapper,
} from "@category/application/dtos/category_output.dto";

export type InputGetCategoryUseCase = {
  id: string;
};

export type OutputGetCategoryUseCase = CategoryOutputDTO;

export class GetCategoryUseCase
  implements UseCase<InputGetCategoryUseCase, OutputGetCategoryUseCase>
{
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute({
    id,
  }: InputGetCategoryUseCase): Promise<OutputGetCategoryUseCase> {
    const category = await this.categoryRepository.findById(id);
    return CategoryOutputMapper.toOutputDTO(category);
  }
}
