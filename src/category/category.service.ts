import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/categories.entity';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['products'] });
  }

  async findOne(uuid: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { uuid } });
    if (!category) throw new NotFoundException(`Categoría con UUID ${uuid} no encontrada`);
    return category;
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(dto);
    return await this.categoryRepository.save(category);
  }

  async update(uuid: string, dto: UpdateCategoryDto): Promise<Category> {
    await this.categoryRepository.update(uuid, dto);
    return this.findOne(uuid);
  }

  async remove(uuid: string): Promise<void> {
    await this.categoryRepository.delete(uuid);
  }
}
