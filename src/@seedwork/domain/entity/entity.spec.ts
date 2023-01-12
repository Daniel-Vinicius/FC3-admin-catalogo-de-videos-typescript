import { validate as uuidValidate } from "uuid";

import { UniqueEntityId } from "@seedwork/domain/value-objects/unique_entity_id.vo";
import { Entity } from "@seedwork/domain/entity/entity";

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

describe("Entity Unit Tests", () => {
  it("should set props and id", () => {
    const arrange = { prop1: "value1", prop2: 2 };
    const entity = new StubEntity(arrange);

    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(uuidValidate(entity.id)).toBeTruthy();
    expect(entity.props).toStrictEqual(arrange);
  });

  it("should accept a valid uuid", () => {
    const arrange = { prop1: "value1", prop2: 2 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId);

    expect(entity.id).toBe(uniqueEntityId.value);
    expect(entity.props).toStrictEqual(arrange);
  });

  it("should convert a entity to a Javascript Object", () => {
    const arrange = { prop1: "value1", prop2: 2 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId);

    expect(entity.toJSON()).toStrictEqual({
      id: uniqueEntityId.value,
      ...arrange,
    });
  });
});
