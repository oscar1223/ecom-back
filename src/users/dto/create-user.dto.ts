import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'El nombre completo del usuario' })
    @IsString()
    name: string;
    
    @ApiProperty({ example: 'test@example.com', description: 'El email del usuario' })
    @IsEmail()
    email: string;
    
    @ApiProperty({ example: 'strongPassword123', description: 'La contraseña del usuario' })
    @IsString()
    @MinLength(8)
    password: string;
}
