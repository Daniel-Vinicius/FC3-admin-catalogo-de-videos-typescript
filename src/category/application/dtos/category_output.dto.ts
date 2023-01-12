import { Category } from "category/domain/entities/category";

export type CategoryOutputDTO = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
};

export class CategoryOutputMapper {
  static toOutputDTO(entity: Category): CategoryOutputDTO {
    return entity.toJSON();
  }
}
