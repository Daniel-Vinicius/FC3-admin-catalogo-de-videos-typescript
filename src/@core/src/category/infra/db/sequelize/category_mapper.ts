import { EntityValidationError, UniqueEntityId } from "@seedwork/domain";

import { Category } from "@category/domain";
import { CategoryModel } from "@category/infra/db/sequelize";

export class CategoryModelMapper {
  static toEntity(model: CategoryModel) {
    const { id, ...otherData } = model.toJSON();

    try {
      return new Category(otherData, new UniqueEntityId(id));
    } catch (e) {
      if (e instanceof EntityValidationError) {
        throw new Error(e.message);
      }

      throw e;
    }
  }
}
