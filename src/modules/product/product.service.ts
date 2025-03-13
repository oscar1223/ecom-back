import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Create product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description, price, userId, categoryId } = createProductDto;

    try {
      return await this.prisma.product.create({
        data: {
          name,
          description,
          price,
          user: {
            connect: { id: userId },
          },
          // Conect with category if categoryId exists
          ...(categoryId && {
            category: {
              connect: { id: categoryId },
            },
          }),
        },
      });
    } catch (error) {
      // Manejo de error genérico
      throw new InternalServerErrorException('Error creating product');
    }
  }

  // 2. Return all products
  async findAll(): Promise<Product[]> {
    try {
      return await this.prisma.product.findMany({
        include: { user: true, category: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving products');
    }
  }

  // 3. Filter product by id
  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: { user: true, category: true },
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Re-lanzamos la excepción si es la nuestra
        throw error;
      }
      throw new InternalServerErrorException(`Error finding product with ID ${id}`);
    }
  }

  // 4. Update product
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      // Desestructuramos los campos
      const { categoryId, userId, ...rest } = updateProductDto;

      // Construimos el objeto de datos dinámicamente
      const data: any = { ...rest };

      if (typeof userId === 'number') {
        data.user = {
          connect: { id: userId },
        };
      }
      if (typeof categoryId === 'number') {
        data.category = {
          connect: { id: categoryId },
        };
      } else if (categoryId === null) {
        // Si categoryId es null, desconecta la categoría
        data.category = {
          disconnect: true,
        };
      }

      // Verificamos la existencia primero (opcional)
      const existing = await this.prisma.product.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return await this.prisma.product.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error updating product with ID ${id}`);
    }
  }

  // 5. Remove product
  async remove(id: number): Promise<Product> {
    try {
      // Verificamos si existe el product
      const existing = await this.prisma.product.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error deleting product with ID ${id}`);
    }
  }
}
