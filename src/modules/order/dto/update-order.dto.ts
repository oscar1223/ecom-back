import { IsInt, IsOptional, IsString, IsNumber, IsArray, ValidateNested, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderItemDto {
  @ApiProperty({ example: 543, description: 'Nuevo relacion con el producto por ID' })
  @IsInt()
  @IsOptional()
  productId: number;

  @ApiProperty({ example: 2, description: 'Nueva cantidad de productos' })
  @IsInt()
  @IsOptional()
  quantity?: number;

  @ApiProperty({ example: 100, description: 'Nuevo precio unitario al momento de la creacion de la orden' })
  @IsNumber()
  @IsOptional()
  price?: number;
}

export class UpdateOrderDto {
  @ApiProperty({ example: 5432, description: 'Nuevo relacion con el usuario por ID' })
  @IsInt()
  @IsOptional()
  userId?: number;

  @ApiProperty({ example: 432, description: 'Nuevo relacion con la direccion por ID' })
  @IsInt()
  @IsOptional()
  addressId?: number;

  @ApiProperty({ example: 'PENDING', description: 'Nuevo estado de la orden' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ example: 100, description: 'Nuevo precio total de la orden' })
  @IsNumber()
  @IsOptional()
  total?: number;

  @ApiProperty({ example: '2021-02-02T00:00:00Z', description: 'Nueva fecha de creacion de la orden' })
  @IsString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({ example: '2021-02-02T00:00:00Z', description: 'Nueva fecha de actualizacion de la orden' })
  @IsString()
  @IsOptional()
  updatedAt? : string;
  
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderItemDto)
  orderItems?: UpdateOrderItemDto[];
}
