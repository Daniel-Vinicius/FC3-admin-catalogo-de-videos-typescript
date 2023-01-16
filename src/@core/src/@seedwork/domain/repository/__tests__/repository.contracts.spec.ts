import {
  SearchParams,
  SearchResult,
} from "@seedwork/domain/repository/repository.contracts";

describe("SearchParams Unit Tests", () => {
  test("page prop", () => {
    const params = new SearchParams();
    expect(params.page).toBe(1);

    const arrange: { page: any; expected: number }[] = [
      { page: null, expected: 1 },
      { page: undefined, expected: 1 },
      { page: "", expected: 1 },
      { page: "fake", expected: 1 },
      { page: 0, expected: 1 },
      { page: -1, expected: 1 },
      { page: 5.5, expected: 1 },
      { page: true, expected: 1 },
      { page: false, expected: 1 },
      { page: {}, expected: 1 },

      { page: 1, expected: 1 },
      { page: 2, expected: 2 },
    ];

    arrange.forEach((i) => {
      const params = new SearchParams({ page: i.page });
      expect(params.page).toBe(i.expected);
    });
  });

  test("per_page prop", () => {
    const params = new SearchParams();
    expect(params.per_page).toBe(15);

    const arrange: { per_page: any; expected: number }[] = [
      { per_page: null, expected: 15 },
      { per_page: undefined, expected: 15 },
      { per_page: "", expected: 15 },
      { per_page: "fake", expected: 15 },
      { per_page: 0, expected: 15 },
      { per_page: -1, expected: 15 },
      { per_page: 5.5, expected: 15 },
      { per_page: true, expected: 15 },
      { per_page: false, expected: 15 },
      { per_page: {}, expected: 15 },

      { per_page: 15, expected: 15 },
      { per_page: 20, expected: 20 },
      { per_page: 30, expected: 30 },
      { per_page: 10, expected: 10 },
    ];

    arrange.forEach((i) => {
      const params = new SearchParams({ per_page: i.per_page });
      expect(params.per_page).toBe(i.expected);
    });
  });

  test("sort prop", () => {
    const params = new SearchParams();
    expect(params.sort).toBe(null);

    const arrange: { sort: any; expected: any }[] = [
      { sort: null, expected: null },
      { sort: undefined, expected: null },
      { sort: "", expected: null },
      { sort: 0, expected: "0" },
      { sort: -1, expected: "-1" },
      { sort: true, expected: "true" },
      { sort: {}, expected: "[object Object]" },

      { sort: "field", expected: "field" },
    ];

    arrange.forEach((i) => {
      const params = new SearchParams({ sort: i.sort });
      expect(params.sort).toBe(i.expected);
    });
  });

  test("sort_dir prop", () => {
    let params = new SearchParams();
    expect(params.sort_dir).toBeNull();

    params = new SearchParams({ sort: null });
    expect(params.sort_dir).toBeNull();

    params = new SearchParams({ sort: undefined });
    expect(params.sort_dir).toBeNull();

    params = new SearchParams({ sort: "" });
    expect(params.sort_dir).toBeNull();

    const arrange: { sort_dir: any; expected: any }[] = [
      { sort_dir: null, expected: "asc" },
      { sort_dir: undefined, expected: "asc" },
      { sort_dir: "", expected: "asc" },
      { sort_dir: 0, expected: "asc" },
      { sort_dir: -1, expected: "asc" },
      { sort_dir: true, expected: "asc" },
      { sort_dir: {}, expected: "asc" },
      { sort_dir: "fake", expected: "asc" },
      { sort_dir: "ASC", expected: "asc" },
      { sort_dir: "asc", expected: "asc" },
      { sort_dir: "desc", expected: "desc" },
      { sort_dir: "DESC", expected: "desc" },
    ];

    arrange.forEach((i) => {
      const params = new SearchParams({ sort: "field", sort_dir: i.sort_dir });
      expect(params.sort_dir).toBe(i.expected);
    });
  });

  test("filter prop", () => {
    const params = new SearchParams();
    expect(params.filter).toBeNull();

    const arrange: { filter: any; expected: any }[] = [
      { filter: null, expected: null },
      { filter: undefined, expected: null },
      { filter: "", expected: null },

      { filter: 0, expected: "0" },
      { filter: -1, expected: "-1" },
      { filter: true, expected: "true" },
      { filter: {}, expected: "[object Object]" },
      { filter: "field", expected: "field" },
    ];

    arrange.forEach((i) => {
      const params = new SearchParams({ filter: i.filter });
      expect(params.filter).toBe(i.expected);
    });
  });
});

describe("SearchResult Unit Tests", () => {
  test("constructor props", () => {
    let result = new SearchResult({
      items: ["entity1", "entity2"] as any,
      total: 100,
      current_page: 1,
      per_page: 25,
      sort: null,
      sort_dir: null,
      filter: null,
    });

    expect(result.toJSON()).toStrictEqual({
      items: ["entity1", "entity2"],
      total: 100,
      current_page: 1,
      per_page: 25,
      last_page: 4,
      sort: null,
      sort_dir: null,
      filter: null,
    });

    result = new SearchResult({
      items: ["entity1", "entity2"] as any,
      total: 100,
      current_page: 1,
      per_page: 25,
      sort: "name",
      sort_dir: "desc",
      filter: "John Doe",
    });

    expect(result.toJSON()).toStrictEqual({
      items: ["entity1", "entity2"],
      total: 100,
      current_page: 1,
      per_page: 25,
      last_page: 4,
      sort: "name",
      sort_dir: "desc",
      filter: "John Doe",
    });
  });

  test("should set last_page 1 when per_page field is greater than total field", () => {
    const result = new SearchResult({
      items: ["entity1", "entity2"] as any,
      total: 4,
      current_page: 1,
      per_page: 15,
      sort: "name",
      sort_dir: "desc",
      filter: "John Doe",
    });

    expect(result.last_page).toBe(1);
  });

  test("last_page prop when total is not a multiple of per_page ", () => {
    const result = new SearchResult({
      items: ["entity1", "entity2"] as any,
      total: 41,
      current_page: 1,
      per_page: 10,
      sort: "name",
      sort_dir: "desc",
      filter: "John Doe",
    });

    expect(result.last_page).toBe(5);
  });
});
