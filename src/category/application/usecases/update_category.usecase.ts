import { UseCase } from "@seedwork/application/usecase";
import { CategoryRepository } from "@category/domain/repository/category.repository";
import {
  CategoryOutputDTO,
  CategoryOutputMapper,
} from "@category/application/dtos/category_output.dto";

export type Input = {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
};

export type Output = CategoryOutputDTO;

export class UpdateCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute({ id, name, description, is_active }: Input): Promise<Output> {
    const entity = await this.categoryRepository.findById(id);
    entity.update(name, description);

    if (is_active === true) {
      entity.activate();
    }

    if (is_active === false) {
      entity.deactivate();
    }

    await this.categoryRepository.update(entity);

    return CategoryOutputMapper.toOutputDTO(entity);
  }
}
