import { Entity } from "../entity/entity";
import { UniqueEntityId } from "../value-objects/unique_entity_id.vo";

export interface RepositoryInterface<Props, E extends Entity<Props>> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}