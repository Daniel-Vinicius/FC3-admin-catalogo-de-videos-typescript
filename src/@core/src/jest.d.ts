import { FieldsErrors } from "@seedwork/domain/validators";

declare global {
  namespace jest {
    interface Matchers<R> {
      containsErrorMessages: (expected: FieldsErrors) => R;
    }
  }
}

export {};
