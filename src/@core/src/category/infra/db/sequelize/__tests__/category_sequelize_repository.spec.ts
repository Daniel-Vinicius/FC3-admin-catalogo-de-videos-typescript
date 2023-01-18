import { NotFoundError, UniqueEntityId } from "@seedwork/domain";
import { Category } from "@category/domain";

import {
  CategoryModel,
  CategorySequelizeRepository,
} from "@category/infra/db/sequelize";

import { prepareSequelizeInstanceForTestsUsingSQLITE } from "@category/infra/db/sequelize/__tests__/util";

describe("CategorySequelizeRepository Tests", () => {
  prepareSequelizeInstanceForTestsUsingSQLITE();

  let repository: CategorySequelizeRepository;

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
  });

  it("should insert a new entity", async () => {
    let arrange = [
      new Category({ name: "Movie", is_active: false }),
      new Category({ name: "Comedy", description: "Some description" }),
    ];

    for (const category of arrange) {
      await repository.insert(category);

      const modelInserted = await CategoryModel.findByPk(category.id);
      expect(modelInserted.toJSON()).toStrictEqual(category.toJSON());
    }
  });

  it("should throws error when entity not found", async () => {
    await expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError("Model not found using ID fake id")
    );

    await expect(
      repository.findById(
        new UniqueEntityId("9366b7dc-2d71-4799-b91c-c64adb205104")
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Model not found using ID 9366b7dc-2d71-4799-b91c-c64adb205104`
      )
    );
  });

  it("should finds a entity by id", async () => {
    const entity = new Category({ name: "Movie" });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it("should deletes an entity", async () => {
    let category = new Category({ name: "Movie" });
    await CategoryModel.create(category.toJSON());

    await repository.delete(category.id);
    const modelDeleted = await CategoryModel.findByPk(category.id);

    expect(modelDeleted).toBeNull();
  });
});
