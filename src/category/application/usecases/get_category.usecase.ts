import { CategoryRepository } from "category/domain/repository/category.repository";
import { CategoryOutputDTO } from "../dtos/category_output.dto";

export type Input = {
  id: string;
};

export type Output = CategoryOutputDTO;

export class GetCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute({ id }: Input): Promise<Output> {
    const category = await this.categoryRepository.findById(id);
    return category.toJSON();
  }
}
