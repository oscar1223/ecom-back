import { IsInt, IsOptional, IsString, IsNumber, IsArray, ValidateNested, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrderItemDto {
  @IsInt()
  @IsOptional()
  productId?: number;

  @IsInt()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  price?: number;
}

export class UpdateOrderDto {
  @IsInt()
  @IsOptional()
  userId?: number;

  @IsInt()
  @IsOptional()
  addressId?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsNumber()
  @IsOptional()
  total?: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderItemDto)
  orderItems?: UpdateOrderItemDto[];
}
