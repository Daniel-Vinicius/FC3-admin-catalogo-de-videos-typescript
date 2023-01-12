import { validateSync } from "class-validator";

import {
  FieldsErrors,
  ValidatorFieldsInterface,
} from "@seedwork/domain/validators/validator_fields.interface";

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors = null;
  validatedData: PropsValidated = null;

  validate(data: any): boolean {
    const classValidatorErrors = validateSync(data);
    if (classValidatorErrors.length > 0) {
      this.errors = {};
      for (const error of classValidatorErrors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      }
    } else {
      this.validatedData = data;
    }

    return classValidatorErrors.length < 1;
  }
}
