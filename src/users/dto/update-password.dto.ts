import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
    @IsString()
    @ApiProperty({ example: '12345678', description: 'Nueva contraseña' })
    @MinLength(8)
    newPassword: string;
}