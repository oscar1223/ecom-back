import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User} from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor (private prisma: PrismaService) {}

    // 1. Create user (register)
    async create(data: { name: string; email: string; password: string }): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
        });
        return user;
    }

    // 2. Find user by email (for the login)
    async findByEmail(email: string): Promise<User | null> {
        //Verify that user exists
        const user = await this.prisma.user.findUnique({
            where: {email},
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    // 3. Update user
    async updateUser(id: number, data: { name?: string; email?: string }): Promise<User> {
        
        //Verify that user exists
        const user = await this.prisma.user.findUnique({
            where: {id},
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.prisma.user.update({
            where: {id},
            data,
        });

    }

    // 4. Update password (this is a testing function, the real must have more validators)
    async updatePassword(id: number, newPassword: string): Promise<User> {
        
        //Verify that user exists
        const user = await this.prisma.user.findUnique({ where: {id} });
        if (!user) throw new NotFoundException('User not found');

        const hashedPassword = await bcrypt.hash(newPassword, 8);
        return this.prisma.user.update({
            where: {id},
            data: {
                password: hashedPassword,
            },
        });
    }

    // 5. Deactivate user
    async deactivateUser(id: number): Promise<User> {
        //Verify that user exists
        const user = await this.prisma.user.findUnique({ where: {id} });
        if (!user) throw new NotFoundException('User not found');

        return this.prisma.user.update({
            where: {id},
            data: {
                active: false,
            },
        });
    }

    // 6. Activate user
    async activateUser(id: number): Promise<User> {
        //Verify that user exists
        const user = await this.prisma.user.findUnique({ where: {id} });
        if (!user) throw new NotFoundException('User not found');

        return this.prisma.user.update({
            where: {id},
            data: {
                active: true,
            },
        });
    }

    // Helper for hashing password
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
  
}