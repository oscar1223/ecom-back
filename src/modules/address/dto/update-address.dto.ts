import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressDto {
  @ApiProperty({ example: 45, description: 'Nuevo Id usuario' })
  @IsInt()
  @IsOptional()
  userId?: number;

  @ApiProperty({ example: 'Buleria', description: 'Nuevo nombre de la calle' })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiProperty({ example: 'Cadiz', description: 'Nuevo nombre de la ciudad' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 'Andalucia', description: 'Nuevo nombre estado o provincia' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ example: '49987', description: 'Codigo postal' })
  @IsString()
  @IsOptional()
  zipCode?: string;

  @ApiProperty({ example: 'España', description: 'Pais' })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ example: true, description: 'Es address principal?' })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}
