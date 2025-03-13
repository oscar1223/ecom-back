import { IsString, IsEmail, MinLength, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Oscarapio Arapio', description: 'El nombre completo del usuario' })
    @IsString()
    @IsOptional()
    name: string;
    
    @ApiProperty({ example: 'test@example.com', description: 'El email del usuario' })
    @IsEmail()
    email: string;
    
    @ApiProperty({ example: 'strongPassword123', description: 'La contraseña del usuario' })
    @IsString()
    @MinLength(8)
    password: string;

    @ApiProperty({ example: true, description: 'Estado del usuario' })
    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
