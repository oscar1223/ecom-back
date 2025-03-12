import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  // Podrías usar @IsDecimal() o @IsNumber(). 
  // Con class-validator, no existe un decorador "oficial" para decimales, 
  // a menudo se maneja como string y se parsea.
  @IsNumber()
  price: number;

  @IsInt()
  userId: number;

  @IsInt()
  @IsOptional()
  categoryId?: number;
}
