import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { CategoriesService } from 'src/category/category.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
    private readonly categoryService: CategoriesService,
  ) {}

  async findAll(params: {
    page?: number;
    limit?: number;
    name?: string;
    categoryId?: string;
  }) {
    const { page = 1, limit = 10, name, categoryId } = params;

    const where: FindOptionsWhere<Product> = {
      ...(name && { name: Like(`%${name}%`) }),
      ...(categoryId && { category: { id: categoryId } }),
    };

    const [items, count] = await this.repo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      total: count,
      results: items,
    };
  }

  async findOne(id: string) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(dto: CreateProductDto) {
    const margin = dto.price - dto.cost;

    const category = await this.categoryService.findOrCreate(dto.categoryId);

    const product = this.repo.create({
      ...dto,
      category,
      margin,
    });

    return this.repo.save(product);
  }

  async update(id: string, dto: UpdateProductDto) {
    const existing = await this.findOne(id);
    const margin = dto.price - dto.cost;
    return this.repo.save({ ...existing, ...dto, margin });
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    await this.repo.remove(existing);
  }
}
