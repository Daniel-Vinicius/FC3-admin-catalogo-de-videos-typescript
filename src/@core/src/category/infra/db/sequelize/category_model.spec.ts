import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "@category/infra/db/sequelize/category_model";

describe("CategoryModel Tests", () => {
  let sequelize: Sequelize;

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      host: ":memory:",
      logging: true,
      models: [CategoryModel],
    });
  });

  beforeEach(async () => await sequelize.sync({ force: true }));
  afterAll(async () => await sequelize.close());

  it("any", async () => {});
});
