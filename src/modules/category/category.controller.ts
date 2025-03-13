import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
  import { CategoryService } from './category.service';
  import { CreateCategoryDto } from './dto/create-category.dto';
  import { UpdateCategoryDto } from './dto/update-category.dto';
  import { Category } from '@prisma/client';
  
  @Controller('categories')
  export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
    /**
     * Crea una categoría
     */
    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
      return this.categoryService.create(createCategoryDto);
    }
  
    /**
     * Lista todas las categorías
     */
    @Get()
    findAll(): Promise<Category[]> {
      return this.categoryService.findAll();
    }
  
    /**
     * Retorna una categoría específica
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
      return this.categoryService.findOne(id);
    }
  
    /**
     * Actualiza una categoría
     */
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateCategoryDto: UpdateCategoryDto,
    ): Promise<Category> {
      return this.categoryService.update(id, updateCategoryDto);
    }
  
    /**
     * Elimina una categoría
     */
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<Category> {
      return this.categoryService.remove(id);
    }
  }
  