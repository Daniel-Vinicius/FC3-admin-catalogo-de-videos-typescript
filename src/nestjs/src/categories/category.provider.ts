import {
  CreateCategoryUseCase,
  UpdateCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  DeleteCategoryUseCase,
} from '@fc/micro-videos/category/application';

import { CategoryRepository } from '@fc/micro-videos/category/domain';
import { CategoryInMemoryRepository } from '@fc/micro-videos/category/infra';

export namespace CATEGORY_PROVIDERS {
  export namespace REPOSITORIES {
    export const CATEGORY_IN_MEMORY_REPOSITORY = {
      provide: 'CategoryInMemoryRepository',
      useClass: CategoryInMemoryRepository,
    };
  }

  export namespace USE_CASES {
    export const CREATE_CATEGORY_USE_CASE = {
      provide: CreateCategoryUseCase.UseCase,
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide],
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new CreateCategoryUseCase.UseCase(categoryRepo);
      },
    };

    export const DELETE_CATEGORY_USE_CASE = {
      provide: DeleteCategoryUseCase.UseCase,
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide],
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new DeleteCategoryUseCase.UseCase(categoryRepo);
      },
    };

    export const GET_CATEGORY_USE_CASE = {
      provide: GetCategoryUseCase.UseCase,
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide],
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new GetCategoryUseCase.UseCase(categoryRepo);
      },
    };

    export const LIST_CATEGORIES_USE_CASE = {
      provide: ListCategoriesUseCase.UseCase,
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide],
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new ListCategoriesUseCase.UseCase(categoryRepo);
      },
    };

    export const UPDATE_CATEGORY_USE_CASE = {
      provide: UpdateCategoryUseCase.UseCase,
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide],
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new UpdateCategoryUseCase.UseCase(categoryRepo);
      },
    };
  }
}
