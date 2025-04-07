// auth.service.ts (con return { token, user })
import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  /**
   * Autentica a un usuario validando email y password.
   * Devuelve token JWT y la info básica del usuario si es correcto.
   */
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    try {
      if (!email || !password) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      // 1. Buscar el usuario
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      // 2. Validar contraseña
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      // 3. Generar token
      const payload = { sub: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload);

      // 4. Retornamos token y user
      return {
        token,
        user: {
          // Incluimos los campos que quieras exponer en el frontend
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt, // si lo tienes en tu modelo
          // etc.
        }
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Error during login process');
    }
  }
}
