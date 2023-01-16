import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { Category } from '@fc/micro-videos/category/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // console.log(new Category({ name: 'Potato' }));
    return this.appService.getHello();
  }
}
