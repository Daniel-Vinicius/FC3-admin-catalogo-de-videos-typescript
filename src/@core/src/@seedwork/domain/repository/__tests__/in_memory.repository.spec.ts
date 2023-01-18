import { Entity } from "@seedwork/domain/entity/entity";
import { NotFoundError } from "@seedwork/domain/errors/not_found.error";
import { UniqueEntityId } from "@seedwork/domain/value-objects/unique_entity_id.vo";
import { InMemoryRepository } from "@seedwork/domain/repository/in_memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => (repository = new StubInMemoryRepository()));

  it("should inserts a new entity", async () => {
    const entity = new StubEntity({ name: "Shirt", price: 10 });
    await repository.insert(entity);

    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error when entity not found", async () => {
    const id = "fake id";

    await expect(repository.findById(id)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${id}`)
    );

    const vo_id = new UniqueEntityId();
    await expect(repository.findById(vo_id)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${vo_id.value}`)
    );
  });

  it("should finds a entity by id", async () => {
    const entity = new StubEntity({ name: "Shirt", price: 10 });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it("should returns all entities", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    const entities = await repository.findAll();

    expect(entities).toStrictEqual([entity]);
  });

  it("should throws error on update when entity not found", () => {
    const entity = new StubEntity({ name: "name value", price: 5 });

    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${entity.id}`)
    );
  });

  it("should updates an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    const entityUpdated = new StubEntity(
      { name: "updated name", price: 10 },
      entity.uniqueEntityId
    );

    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error on delete when entity not found", () => {
    const id = "fake id";
    expect(repository.delete(id)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${id}`)
    );

    const vo_id = new UniqueEntityId();
    expect(repository.delete(vo_id)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${vo_id.value}`)
    );
  });

  it("should deletes an entity", async () => {
    let entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);
    await repository.delete(entity.uniqueEntityId);
    expect(repository.items).toHaveLength(0);
  });
});
