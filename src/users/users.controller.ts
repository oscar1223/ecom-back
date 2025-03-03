import {
    Controller,
    Post,
    Patch,
    Body,
    Param,
    ParseIntPipe,
    UseGuards,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { UpdatePasswordDto } from './dto/update-password.dto';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Register
    @Post('register')
    create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }

    // Update user
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.usersService.updateUser(id, updateUserDto);
    }

    // Update password
    @UseGuards(JwtAuthGuard)
    @Patch(':id/password')
    updatePassword(
      @Param('id', ParseIntPipe) id: number,
      @Body() updatePasswordDto: UpdatePasswordDto,
    ) {
      return this.usersService.updatePassword(id, updatePasswordDto.newPassword);
    }

    // Deactivate user
    @UseGuards(JwtAuthGuard)
    @Patch(':id/deactivate')
    deactivate(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.deactivateUser(id);
    }

    // Activate user
    @UseGuards(JwtAuthGuard)
    @Patch(':id/activate')
    activate(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.activateUser(id);
    }
    
  }
  