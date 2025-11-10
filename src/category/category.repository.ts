import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Método para obtener todas las categorías
  async findAllRepository(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  // Método para buscar una categoría por su nombre
  async findByNameRepository(name: string): Promise<Category | null> {
    return await this.categoryRepository.findOne({ where: { name } });
  }

  // Método para crear una categoría
  async createRepository(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  // Método para buscar categoría por UUID (corregido)
  async findByIdRepository(uuid: string): Promise<Category | null> {
    return await this.categoryRepository.findOne({ where: { uuid } });
  }

  // Método para actualizar una categoría
  async updateRepository(
    categoryToUpdate: Category,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    categoryToUpdate.name = updateCategoryDto.name || categoryToUpdate.name;
    const updatedCategory = await this.categoryRepository.save(categoryToUpdate);
    return updatedCategory;
  }
}
