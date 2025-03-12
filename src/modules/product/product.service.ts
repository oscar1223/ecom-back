import { Injectable, NotFoundException } from '@nestjs/common';
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
    
    return this.prisma.product.create({
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
  }

  // Return all products
  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: { user: true, category: true },
    });
  }

  // Filter product for id
  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { user: true, category: true },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Update product
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const { categoryId, userId, ...rest } = updateProductDto;

    // Craft the data object dynamically
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
      // If categoryId is null, disconnect the category
      data.category = {
        disconnect: true,
      };
    }

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  // Remove
  async remove(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
