import { NotFoundError, UniqueEntityId } from "@seedwork/domain";
import { Category, CategoryRepository } from "@category/domain";

import {
  CategoryModel,
  CategoryModelMapper,
} from "@category/infra/db/sequelize";

export class CategorySequelizeRepository
  implements CategoryRepository.Repository
{
  constructor(private categoryModel: typeof CategoryModel) {}

  sortableFields: string[] = ["name", "created_at"];

  async search(
    props: CategoryRepository.SearchParams
  ): Promise<CategoryRepository.SearchResult> {
    throw new Error("Method not implemented.");
  }

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON());
  }

  async findById(id: string | UniqueEntityId): Promise<Category> {
    const categoryModel = await this._get(id.toString());
    const categoryEntity = CategoryModelMapper.toEntity(categoryModel);

    return categoryEntity;
  }

  async findAll(): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }

  async update(entity: Category): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.categoryModel.destroy({ where: { id: id.toString() } });
  }

  private async _get(id: string) {
    return await CategoryModel.findByPk(id, {
      rejectOnEmpty: new NotFoundError(`Model not found using ID ${id}`),
    });
  }
}
