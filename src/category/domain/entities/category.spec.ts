import { omit } from "lodash";
import { Category, CategoryProperties } from "./category";
import { UniqueEntityId } from "@seedwork/domain/value-objects/unique_entity_id.vo";

describe("Category Unit Tests", () => {
  beforeEach(() => {
    Category.validate = jest.fn();
  });

  test("constructor of category", () => {
    let category = new Category({ name: "Movie" });
    expect(Category.validate).toHaveBeenCalled();

    let props = omit(category.props, "created_at");
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    category = new Category({ name: "Movie", description: "description" });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "description",
    });

    category = new Category({ name: "Movie", is_active: true });
    expect(category.props).toMatchObject({ name: "Movie", is_active: true });

    created_at = new Date();
    category = new Category({ name: "Movie", created_at });
    expect(category.props).toMatchObject({ name: "Movie", created_at });
  });

  test("id field", () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };
    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      {
        props: { name: "Movie" },
        id: new UniqueEntityId("6be7293a-7cd3-49f2-8136-0a6c66d1a8f7"),
      },
    ];

    data.forEach((item) => {
      let category = new Category(item.props, item.id);
      expect(category.id).not.toBeNull();
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("getter and setter of name prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");

    category = new Category({ name: "Movie" });
    category["name"] = "Other Name";
    expect(category.name).toBe("Other Name");
  });

  test("getter and setter of description prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.description).toBeNull();

    category = new Category({ name: "Movie", description: "description" });
    expect(category.description).toBe("description");

    category = new Category({ name: "Movie" });
    category["description"] = "other description";
    expect(category.description).toBe("other description");

    category["description"] = undefined;
    expect(category.description).toBeNull();
  });

  test("getter and setter of is_active prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: true });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });
    expect(category.is_active).toBeFalsy();
  });

  test("getter of created_at prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({ name: "Movie", created_at });
    expect(category.created_at).toBe(created_at);
  });

  test("update method", () => {
    const category = new Category({ name: "Comedy", description: "Funny" });
    expect(category.props).toMatchObject({
      name: "Comedy",
      description: "Funny",
    });

    category.update("Horror", "Fear");
    expect(Category.validate).toBeCalledTimes(2);
    expect(category.props).toMatchObject({
      name: "Horror",
      description: "Fear",
    });
  });

  test("activate and deactivate methods", () => {
    const category = new Category({ name: "Comedy", description: "Funny" });
    expect(category.is_active).toBe(true);

    category.deactivate();
    expect(category.is_active).toBe(false);

    category.activate();
    expect(category.is_active).toBe(true);
  });
});
