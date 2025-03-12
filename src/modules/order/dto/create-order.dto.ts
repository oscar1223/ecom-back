import { IsInt, IsOptional, IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;

  @IsNumber()
  price: number;  // unit price at order creation
}

export class CreateOrderDto {
  @IsInt()
  userId: number;

  @IsInt()
  @IsOptional()
  addressId?: number;

  @IsString()
  @IsOptional()
  status?: string; // "PENDING", "PAID", etc.

  @IsNumber()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];
}
