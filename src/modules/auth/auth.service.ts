import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}
    /**
     * User verify authentication with email and password
     * @param email 
     * @param password 
     * @returns 
     */
    async login(email: string, password: string): Promise<{token: string}> {
        // Validate both fields
        if (!email || !password) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Find user by email
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Validate password
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Generate token
        const payload = { sub: user.id, email: user.email };
        const token = await this.jwtService.signAsync(payload);

        return { token };   
    }
}