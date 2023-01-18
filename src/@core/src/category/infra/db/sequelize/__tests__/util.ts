import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "@category/infra/db/sequelize/category_model";

export function prepareSequelizeInstanceForTestsUsingSQLITE(params?: {
  logging: boolean;
}) {
  let sequelize: Sequelize;

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      host: ":memory:",
      logging: params ? params.logging : false,
      models: [CategoryModel],
    });
  });

  beforeEach(async () => await sequelize.sync({ force: true }));
  afterAll(async () => await sequelize.close());
}
