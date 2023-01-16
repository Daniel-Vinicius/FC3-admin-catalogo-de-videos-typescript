import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

import { ClassValidatorFields } from "@seedwork/domain/validators/class_validator_fields";
import { CategoryProperties } from "@category/domain/entities/category";

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({
    name,
    description,
    is_active,
    created_at,
  }: CategoryProperties) {
    Object.assign(this, { name, description, is_active, created_at });
  }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(data: CategoryProperties) {
    return super.validate(new CategoryRules(data));
  }
}

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
