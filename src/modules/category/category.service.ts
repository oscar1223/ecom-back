import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea una categoría nueva
   */
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name, description } = createCategoryDto;

    return this.prisma.category.create({
      data: {
        name,
        description,
      },
    });
  }

  /**
   * Retorna todas las categorías
   * con posibilidad de incluir los productos (si lo deseas)
   */
  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: { products: true }, // si quieres cargar los productos asociados
    });
  }

  /**
   * Retorna una sola categoría por ID,
   * o lanza NotFoundException si no existe
   */
  async findOne(id: number): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  /**
   * Actualiza una categoría por ID
   */
  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const { name, description } = updateCategoryDto;

    // Verificamos que exista
    const existing = await this.prisma.category.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        name,
        description,
      },
    });
  }

  /**
   * Elimina una categoría por ID
   */
  async remove(id: number): Promise<Category> {
    // Verificamos que exista
    const existing = await this.prisma.category.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // Eliminamos
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
