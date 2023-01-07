import { ValidationError } from "@seedwork/domain/errors/validation.error";
import { Category } from "./category";

describe("Category Integration Tests", () => {
  describe("create method", () => {
    it("should validate a category using name property", () => {
      expect(() => new Category({ name: null })).toThrowError(
        new ValidationError("The name is required")
      );

      expect(() => new Category({ name: "" })).toThrowError(
        new ValidationError("The name is required")
      );

      expect(() => new Category({ name: 5 as any })).toThrowError(
        new ValidationError("The name must be a string")
      );

      expect(() => new Category({ name: "t".repeat(256) })).toThrowError(
        new ValidationError(
          "The name must be less or equal than 255 characters"
        )
      );
    });

    it("should validate a category using description property", () => {
      expect(
        () => new Category({ name: "name", description: 1 as any })
      ).toThrowError(new ValidationError("The description must be a string"));
    });

    it("should validate a category using is_active property", () => {
      expect(
        () => new Category({ name: "name", is_active: 1 as any })
      ).toThrowError(new ValidationError("The is_active must be a boolean"));
    });

    it("should a valid category", () => {
      expect.assertions(0);
      const data = [
        { props: { name: "Movie" } },
        { props: { name: "Movie", description: "some description" } },
        { props: { name: "Movie", description: null } },
        {
          props: {
            name: "Movie",
            description: "some description",
            is_active: false,
          },
        },
        {
          props: {
            name: "Movie",
            description: "some description",
            is_active: true,
          },
        },
      ];

      data.forEach((item) => new Category(item.props));
    });
  });

  describe("update method", () => {
    it("should validate a category using name property", () => {
      const category = new Category({ name: "Movie" });

      expect(() => category.update(null, null)).toThrowError(
        new ValidationError("The name is required")
      );

      expect(() => category.update("", null)).toThrowError(
        new ValidationError("The name is required")
      );

      expect(() => category.update(5 as any, null)).toThrowError(
        new ValidationError("The name must be a string")
      );

      expect(() => category.update("t".repeat(256), null)).toThrowError(
        new ValidationError(
          "The name must be less or equal than 255 characters"
        )
      );
    });

    it("should validate a category using description property", () => {
      const category = new Category({ name: "Movie" });

      expect(() => category.update("name", 1 as any)).toThrowError(
        new ValidationError("The description must be a string")
      );
    });

    it("should a valid category", () => {
      expect.assertions(0);
      const category = new Category({ name: "Movie" });
      category.update("name changed", null);
      category.update("name changed", "some description");
    });
  });
});
