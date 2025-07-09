import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Post()
  create(@Body('name') name: string) {
    return this.categoriesService.create(name);
  }
}
