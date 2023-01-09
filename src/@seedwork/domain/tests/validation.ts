import { ClassValidatorFields } from "../validators/class_validator_fields";
import { FieldsErrors } from "../validators/validator_fields.interface";

type Expected = { validator: ClassValidatorFields<any>; data: any };

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    const { validator, data } = expected;

    const is_valid = validator.validate(data);

    if (is_valid) {
      return {
        pass: false,
        message: () => "The data is valid",
      };
    }

    const isMatch = expect
      .objectContaining(received)
      .asymmetricMatch(validator.errors);

    return isMatch
      ? {
          pass: true,
          message: () => "",
        }
      : {
          pass: false,
          message: () =>
            `The validation errors aren't equal to ${JSON.stringify(
              received
            )}. Current ${JSON.stringify(validator.errors)}`,
        };
  },
});
