import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate a user and return a JWT token' })
  @ApiResponse({ status: 201, description: 'User loged successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto.email, LoginDto.password);
  }
}
