import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

 
@ApiTags('Categories') 
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Crea una categoría
   */
  
  @Post('create')
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  /**
   * Lista todas las categorías
   */
  @UseGuards(JwtAuthGuard)
  @Get('list')
  @ApiOperation({ summary: 'List all categories' })
  @ApiResponse({ status: 201, description: 'Categories listed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  /**
   * Retorna una categoría específica
   */
  @UseGuards(JwtAuthGuard)
  @Get('get/:id')
  @ApiOperation({ summary: 'List one category' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  /**
   * Actualiza una categoría
   */
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 201, description: 'Category updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  /**
   * Elimina una categoría
   */
  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 201, description: 'Category deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.remove(id);
  }
}
