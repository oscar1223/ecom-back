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

    async login(email: string, password: string): Promise<{token: string}> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

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