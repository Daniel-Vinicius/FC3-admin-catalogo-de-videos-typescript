import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Inject,
  HttpCode,
  Query,
} from '@nestjs/common';

import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@fc/micro-videos/category/application';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';

@Controller('categories')
export class CategoriesController {
  @Inject(CreateCategoryUseCase.UseCase)
  private createUseCase: CreateCategoryUseCase.UseCase;

  @Inject(DeleteCategoryUseCase.UseCase)
  private deleteUseCase: DeleteCategoryUseCase.UseCase;

  @Inject(GetCategoryUseCase.UseCase)
  private getUseCase: GetCategoryUseCase.UseCase;

  @Inject(ListCategoriesUseCase.UseCase)
  private listUseCase: ListCategoriesUseCase.UseCase;

  @Inject(UpdateCategoryUseCase.UseCase)
  private updateUseCase: UpdateCategoryUseCase.UseCase;

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.createUseCase.execute(createCategoryDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deleteUseCase.execute({ id });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.getUseCase.execute({ id });
  }

  @Get()
  async search(@Query() searchParams: SearchCategoryDto) {
    return await this.listUseCase.execute(searchParams);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.updateUseCase.execute({
      id,
      ...updateCategoryDto,
    });
  }
}
