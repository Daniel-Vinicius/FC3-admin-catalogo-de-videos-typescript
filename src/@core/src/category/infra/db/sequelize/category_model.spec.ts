import { DataType, Sequelize } from "sequelize-typescript";
import { CategoryModel } from "@category/infra/db/sequelize/category_model";

describe("CategoryModel Tests", () => {
  let sequelize: Sequelize;

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      host: ":memory:",
      logging: false,
      models: [CategoryModel],
    });
  });

  beforeEach(async () => await sequelize.sync({ force: true }));
  afterAll(async () => await sequelize.close());

  test("mapping props", () => {
    const attributesMap = CategoryModel.getAttributes();
    const attributes = Object.keys(attributesMap);

    expect(attributes).toStrictEqual([
      "id",
      "name",
      "description",
      "is_active",
      "created_at",
    ]);

    expect(attributesMap.id).toMatchObject({
      field: "id",
      fieldName: "id",
      primaryKey: true,
      type: DataType.UUID(),
    });

    expect(attributesMap.name).toMatchObject({
      field: "name",
      fieldName: "name",
      allowNull: false,
      type: DataType.STRING(255),
    });

    expect(attributesMap.description).toMatchObject({
      field: "description",
      fieldName: "description",
      allowNull: true,
      type: DataType.TEXT(),
    });

    expect(attributesMap.is_active).toMatchObject({
      field: "is_active",
      fieldName: "is_active",
      allowNull: false,
      type: DataType.BOOLEAN(),
    });

    expect(attributesMap.created_at).toMatchObject({
      field: "created_at",
      fieldName: "created_at",
      allowNull: false,
      type: DataType.DATE(),
    });
  });

  it("create and get", async () => {
    const data = {
      id: "6be7293a-7cd3-49f2-8136-0a6c66d1a8f7",
      name: "Movie",
      description: "Category of movies",
      is_active: true,
      created_at: new Date(),
    };

    const category = await CategoryModel.create(data);

    expect(category.toJSON()).toStrictEqual(data);

    const categoryFound = await CategoryModel.findByPk(data.id);
    expect(categoryFound.toJSON()).toStrictEqual(category.toJSON());
  });
});
