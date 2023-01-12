import { UseCase } from "@seedwork/application/usecase";
import { CategoryRepository } from "@category/domain/repository/category.repository";

import { SearchInputDTO } from "@seedwork/application/dtos/search_input.dto";

import { PaginationOutputDTO } from "@seedwork/application/dtos/pagination_output.dto";
import {
  CategoryOutputDTO,
  CategoryOutputMapper,
} from "@category/application/dtos/category_output.dto";

export type InputListCategoriesUseCase =
  SearchInputDTO<CategoryRepository.Filter>;

export type OutputListCategoriesUseCase =
  PaginationOutputDTO<CategoryOutputDTO>;

export class ListCategoriesUseCase
  implements UseCase<InputListCategoriesUseCase, OutputListCategoriesUseCase>
{
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute(
    input: InputListCategoriesUseCase
  ): Promise<OutputListCategoriesUseCase> {
    const params = new CategoryRepository.SearchParams(input);

    const searchResult = await this.categoryRepository.search(params);

    const categories = searchResult.items.map((category) =>
      CategoryOutputMapper.toOutputDTO(category)
    );

    return {
      ...searchResult,
      items: categories,
    };
  }
}
