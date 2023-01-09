import { CategoryProperties } from "../entities/category";
import {
  CategoryRules,
  CategoryValidator,
  CategoryValidatorFactory,
} from "./category.validator";

describe("CategoryValidator Tests", () => {
  let validator: CategoryValidator;

  beforeEach(() => {
    validator = CategoryValidatorFactory.create();
  });

  test("invalidation cases for name field", () => {
    let isValid = validator.validate({
      name: null,
    });

    expect(isValid).toBe(false);
    expect(validator.errors["name"]).toStrictEqual([
      "name should not be empty",
      "name must be a string",
      "name must be shorter than or equal to 255 characters",
    ]);

    isValid = validator.validate({
      name: "",
    });

    expect(isValid).toBe(false);
    expect(validator.errors["name"]).toStrictEqual([
      "name should not be empty",
    ]);

    isValid = validator.validate({
      name: 5 as any,
    });

    expect(isValid).toBe(false);
    expect(validator.errors["name"]).toStrictEqual([
      "name must be a string",
      "name must be shorter than or equal to 255 characters",
    ]);

    isValid = validator.validate({
      name: "t".repeat(256),
    });

    expect(isValid).toBe(false);
    expect(validator.errors["name"]).toStrictEqual([
      "name must be shorter than or equal to 255 characters",
    ]);
  });

  test("valid cases for fields", () => {
    const validCases: CategoryProperties[] = [
      { name: "some value" },
      { name: "some value", description: undefined },
      { name: "some value", description: null },
      { name: "some value", is_active: true },
      { name: "some value", is_active: false },
      {
        name: "some value",
        created_at: new Date(),
        description: "some description",
        is_active: true,
      },
    ];

    validCases.forEach((data) => {
      let is_valid = validator.validate(data);
      expect(is_valid).toBe(true);
      expect(validator.validatedData).toStrictEqual(new CategoryRules(data));
    });
  });
});
