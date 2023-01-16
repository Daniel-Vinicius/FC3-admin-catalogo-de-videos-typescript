import { FieldsErrors } from "@seedwork/domain/validators";

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
  constructor(public error: FieldsErrors) {
    super("Entity Validation Error");
    this.name = "EntityValidationError";
  }
}
