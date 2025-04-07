import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { PrismaService } from '../../prisma/prisma.service';
  import { User } from '@prisma/client';
  import * as bcrypt from 'bcrypt';
  
  @Injectable()
  export class UsersService {
    constructor(private prisma: PrismaService) {}
  
    // 1. Create user (register)
    async create(data: { name: string; email: string; password: string }): Promise<User> {
      try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return await this.prisma.user.create({
          data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
          },
        });
      } catch (error) {
        throw new InternalServerErrorException('Error creating user');
      }
    }
  
    // 2. Find user by email (for login)
    async findByEmail(email: string): Promise<User | null> {
      try {
        // Verificar que user existe
        const user = await this.prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new NotFoundException('User not found');
        }
  
        // Retornar el user (u otra info)
        return user;
      } catch (error) {
        if (error instanceof NotFoundException) {
          // re-lanzamos
          throw error;
        }
        throw new InternalServerErrorException(`Error finding user by email: ${email}`);
      }
    }
  
    // 3. Update user
    async updateUser(id: number, data: { name?: string; email?: string }): Promise<User> {
      try {
        // Verificar si existe
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
  
        return await this.prisma.user.update({
          where: { id },
          data,
        });
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException(`Error updating user with ID ${id}`);
      }
    }
  
    // 4. Update password (demo function)
    async updatePassword(id: number, newPassword: string): Promise<User> {
      try {
        // Verificar si existe
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
  
        const hashedPassword = await bcrypt.hash(newPassword, 8);
        return await this.prisma.user.update({
          where: { id },
          data: {
            password: hashedPassword,
          },
        });
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException(`Error updating password for user with ID ${id}`);
      }
    }
  
    // 5. Deactivate user
    async deactivateUser(id: number): Promise<User> {
      try {
        // Verificar si existe
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
  
        return await this.prisma.user.update({
          where: { id },
          data: {
            active: false,
          },
        });
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException(`Error deactivating user with ID ${id}`);
      }
    }
  
    // 6. Activate user
    async activateUser(id: number): Promise<User> {
      try {
        // Verificar si existe
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
  
        return await this.prisma.user.update({
          where: { id },
          data: {
            active: true,
          },
        });
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException(`Error activating user with ID ${id}`);
      }
    }

    // Nuevo método para obtener datos de usuario por ID
    async getUserById(id: number): Promise<Partial<User>> {
      try {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
        // Retornamos un objeto sin la contraseña
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException(`Error retrieving user with ID ${id}`);
      }
    }
  
    // Helper for hashing password
    async hashPassword(password: string): Promise<string> {
      try {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
      } catch (error) {
        throw new InternalServerErrorException('Error hashing password');
      }
    }
  }
  