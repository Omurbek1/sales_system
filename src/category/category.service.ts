import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  findAll() {
    return this.repo.find({ order: { name: 'ASC' } });
  }

  create(name: string) {
    const category = this.repo.create({ name });
    return this.repo.save(category);
  }
  async findOrCreate(name: string): Promise<Category> {
    let category = await this.repo.findOne({ where: { name } });
    if (!category) {
      category = this.repo.create({ name });
      await this.repo.save(category);
    }
    return category;
  }
}
