import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CreateAddressDto {
  @IsInt()
  userId: number;

  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  zipCode?: string;

  @IsString()
  country: string;

  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}
