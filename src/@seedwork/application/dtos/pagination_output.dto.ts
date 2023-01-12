import { SortDirection } from "@seedwork/domain/repository/repository.contracts";

export type PaginationOutputDTO<Item> = {
  items: Item[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
  sort: string | null;
  sort_dir: SortDirection | null;
  filter: string | null;
};
