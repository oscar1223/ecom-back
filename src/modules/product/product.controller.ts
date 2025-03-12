import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Create product
  @Post('create-product')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  // Get all products
  @UseGuards(JwtAuthGuard)
  @Get('get-all')
  @ApiResponse({ status: 201, description: 'Products listed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  // Get one product
  @Get('product/:id')
  @ApiResponse({ status: 201, description: 'Product listed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  // Update product
  @Patch('update-product/:id')
  @ApiResponse({ status: 201, description: 'Product updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  // Remove product
  @Delete('remove/:id')
  @ApiResponse({ status: 201, description: 'Product deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.remove(id);
  }
}
