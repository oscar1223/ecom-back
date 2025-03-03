import {
    Controller,
    Post,
    Patch,
    Body,
    Param,
    ParseIntPipe,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { UpdatePasswordDto } from './dto/update-password.dto';

  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Register
    @Post('register')
    create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }

    // Update user
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.usersService.updateUser(id, updateUserDto);
    }

    // Update password
    @Patch(':id/password')
    updatePassword(
      @Param('id', ParseIntPipe) id: number,
      @Body() updatePasswordDto: UpdatePasswordDto,
    ) {
      return this.usersService.updatePassword(id, updatePasswordDto.newPassword);
    }

    // Deactivate user
    @Patch(':id/deactivate')
    deactivate(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.deactivateUser(id);
    }

    // Activate user
    @Patch(':id/activate')
    activate(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.activateUser(id);
    }
    
  }
  