import { IsInt, IsOptional, IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ example: 543, description: 'Relacion con el producto por ID' })
  @IsInt()
  productId: number;

  @ApiProperty({ example: 2, description: 'Cantidad de productos' })
  @IsInt()
  quantity: number;

  @ApiProperty({ example: 100, description: 'Precio unitario al momento de la creacion de la orden' })
  @IsNumber()
  price: number;  // unit price at order creation
}

export class CreateOrderDto {
  @ApiProperty({ example: 5432, description: 'Relacion con el usuario por ID' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 432, description: 'Relacion con la direccion por ID' })
  @IsInt()
  @IsOptional()
  addressId?: number;

  @ApiProperty({ example: 'PENDING', description: 'Estado de la orden' })
  @IsString()
  @IsOptional()
  status?: string; // "PENDING", "PAID", etc.

  @ApiProperty({ example: 100, description: 'Precio total de la orden' })
  @IsNumber()
  total: number;

  @ApiProperty({ example: '2021-02-02T00:00:00Z', description: 'Fecha de creacion de la orden' })
  @IsString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({ example: '2021-02-02T00:00:00Z', description: 'Fecha de actualizacion de la orden' })
  @IsString()
  @IsOptional()
  updatedAt?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];
}
