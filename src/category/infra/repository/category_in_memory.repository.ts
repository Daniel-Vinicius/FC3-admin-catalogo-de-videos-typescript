import { InMemorySearchableRepository } from "@seedwork/domain/repository/in_memory.repository";
import { Category } from "category/domain/entities/category";
import { CategoryRepository } from "category/domain/repository/category.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository {}
