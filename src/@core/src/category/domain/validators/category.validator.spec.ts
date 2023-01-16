import { CategoryProperties } from "@category/domain/entities/category";
import {
  CategoryRules,
  CategoryValidator,
  CategoryValidatorFactory,
} from "@category/domain/validators/category.validator";

describe("CategoryValidator Tests", () => {
  let validator: CategoryValidator;

  beforeEach(() => {
    validator = CategoryValidatorFactory.create();
  });

  test("invalidation cases for name field", () => {
    expect({ validator, data: { name: null } }).containsErrorMessages({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });

    expect({ validator, data: { name: "" } }).containsErrorMessages({
      name: ["name should not be empty"],
    });

    expect({ validator, data: { name: 5 } }).containsErrorMessages({
      name: [
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });

    expect({
      validator,
      data: { name: "t".repeat(256) },
    }).containsErrorMessages({
      name: ["name must be shorter than or equal to 255 characters"],
    });
  });

  test("invalidation cases for description field", () => {
    expect({ validator, data: { description: 5 } }).containsErrorMessages({
      description: ["description must be a string"],
    });
  });

  test("invalidation cases for is_active field", () => {
    expect({ validator, data: { is_active: 5 } }).containsErrorMessages({
      is_active: ["is_active must be a boolean value"],
    });

    expect({ validator, data: { is_active: 0 } }).containsErrorMessages({
      is_active: ["is_active must be a boolean value"],
    });

    expect({ validator, data: { is_active: 1 } }).containsErrorMessages({
      is_active: ["is_active must be a boolean value"],
    });
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
      const is_valid = validator.validate(data);
      expect(is_valid).toBe(true);
      expect(validator.validatedData).toStrictEqual(new CategoryRules(data));
    });
  });
});
