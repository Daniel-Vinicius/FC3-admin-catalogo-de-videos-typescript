import { Category } from "category/domain/entities/category";
import { CategoryRepository } from "category/domain/repository/category.repository";
import { CategoryOutputDTO } from "../dtos/category_output.dto";

export type Input = {
  name: string;
  description?: string;
  is_active?: boolean;
};

export type Output = CategoryOutputDTO;

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute({ name, description, is_active }: Input): Promise<Output> {
    const entity = new Category({
      name,
      description,
      is_active,
    });

    await this.categoryRepository.insert(entity);

    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    };
  }
}
