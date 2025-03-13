import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
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

    try {
      return await this.prisma.category.create({
        data: {
          name,
          description,
        },
      });
    } catch (error) {
      // Aquí podrías revisar error.code si es Prisma (ej.: P2002 unique constraint)
      throw new InternalServerErrorException('Error creating category');
    }
  }

  /**
   * Retorna todas las categorías
   * con posibilidad de incluir los productos (si lo deseas)
   */
  async findAll(): Promise<Category[]> {
    try {
      return await this.prisma.category.findMany({
        include: { products: true }, // si quieres cargar los productos asociados
      });
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving categories');
    }
  }

  /**
   * Retorna una sola categoría por ID
   * o lanza NotFoundException si no existe
   */
  async findOne(id: number): Promise<Category> {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id },
        include: { products: true },
      });

      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // re-lanzamos la excepción
        throw error;
      }
      throw new InternalServerErrorException(
        `Error finding category with ID ${id}`,
      );
    }
  }

  /**
   * Actualiza una categoría por ID
   */
  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const existing = await this.prisma.category.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      const { name, description } = updateCategoryDto;
      return await this.prisma.category.update({
        where: { id },
        data: {
          name,
          description,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error updating category with ID ${id}`,
      );
    }
  }

  /**
   * Elimina una categoría por ID
   */
  async remove(id: number): Promise<Category> {
    try {
      const existing = await this.prisma.category.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      // Eliminamos
      return await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error deleting category with ID ${id}`,
      );
    }
  }
}
