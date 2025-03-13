import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ example: 43, description: 'Id usuario' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 'Roma', description: 'Nombre de la calle' })
  @IsString()
  street: string;

  @ApiProperty({ example: 'Sevilla', description: 'Nombre de la ciudad' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Andalucia', description: 'Nombre estado o provincia' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ example: '43987', description: 'Codigo postal' })
  @IsString()
  @IsOptional()
  zipCode?: string;

  @ApiProperty({ example: 'España', description: 'Pais' })
  @IsString()
  country: string;

  @ApiProperty({ example: true, description: 'Es address principal?' })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}
