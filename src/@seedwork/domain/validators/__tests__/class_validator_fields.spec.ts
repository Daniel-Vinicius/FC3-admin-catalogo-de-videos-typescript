import * as libClassValidator from "class-validator";
import { ClassValidatorFields } from "../class_validator_fields";

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string;
}> {}

describe("ClassValidatorFields Unit Tests", () => {
  it("should initialize errors and validatedData variables with null", () => {
    const validator = new StubClassValidatorFields();
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toBeNull();
  });

  it("should validate with errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    spyValidateSync.mockReturnValue([
      { property: "field", constraints: { isRequired: "some error" } },
    ]);

    const validator = new StubClassValidatorFields();
    expect(validator.validate(null)).toBe(false);

    expect(spyValidateSync).toHaveBeenCalled();
    expect(validator.validatedData).toBeNull();
    expect(validator.errors).toStrictEqual({ field: ["some error"] });
  });

  it("should validate without errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    spyValidateSync.mockReturnValue([]);

    const validator = new StubClassValidatorFields();

    expect(validator.validate({ field: "some string" })).toBe(true);
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toStrictEqual({ field: "some string" });
  });
});
