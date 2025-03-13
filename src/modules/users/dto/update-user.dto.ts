import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'test@example.com', description: 'El nuevo email del usuario' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'strongPassword123', description: 'La nueva contraseña del usuario' })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: 'Oscarapio Arapio', description: 'El nuevo nombre completo del usuario' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: true, description: 'El nuevo estado del usuario' })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}