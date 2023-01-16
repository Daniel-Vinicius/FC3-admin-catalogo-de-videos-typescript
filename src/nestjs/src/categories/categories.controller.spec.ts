import { CategoriesController } from './categories.controller';

import {
  CreateCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@fc/micro-videos/category/application';

import { CreateCategoryDto } from './dto/create-category.dto';
import { SortDirection } from '@fc/micro-videos/@seedwork/domain';

describe('CategoriesController Unit Tests', () => {
  let controller: CategoriesController;

  beforeEach(() => {
    controller = new CategoriesController();
  });

  it('should creates a category', async () => {
    const output: CreateCategoryUseCase.Output = {
      id: '6be7293a-7cd3-49f2-8136-0a6c66d1a8f7',
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    controller['createUseCase'] = mockCreateUseCase as any;

    const input: CreateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };

    const result = await controller.create(input);

    expect(result).toEqual(output);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should deletes a category', async () => {
    const id = '6be7293a-7cd3-49f2-8136-0a6c66d1a8f7';

    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(undefined)),
    };

    controller['deleteUseCase'] = mockDeleteUseCase as any;

    expect(controller.remove(id)).toBeInstanceOf(Promise);

    await controller.remove(id);

    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should gets a category', async () => {
    const id = '6be7293a-7cd3-49f2-8136-0a6c66d1a8f7';
    const output: GetCategoryUseCase.Output = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };

    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    controller['getUseCase'] = mockGetUseCase as any;

    const result = await controller.findOne(id);

    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
    expect(result).toEqual(output);
  });

  it('should list categories', async () => {
    const output: ListCategoriesUseCase.Output = {
      items: [
        {
          id: '9366b7dc-2d71-4799-b91c-c64adb205104',
          name: 'test',
          description: 'some description',
          is_active: true,
          created_at: new Date(),
        },
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test',
    };

    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    controller['listUseCase'] = mockListUseCase as any;
    const searchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test',
    };

    const result = await controller.search(searchParams);

    expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(result).toEqual(output);
  });

  it('should updates a category', async () => {
    const id = '6be7293a-7cd3-49f2-8136-0a6c66d1a8f7';
    const output: UpdateCategoryUseCase.Output = {
      id,
      name: 'Movie Updated',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };

    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    controller['updateUseCase'] = mockUpdateUseCase as any;

    const input: CreateCategoryDto = {
      name: 'Movie Updated',
      description: 'some description',
      is_active: true,
    };

    const result = await controller.update(id, input);

    expect(result).toEqual(output);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
  });
});
