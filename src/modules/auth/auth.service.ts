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
   * Devuelve un token JWT si es correcto.
   */
  async login(email: string, password: string): Promise<{ token: string }> {
    try {
      // Verificar que se proporcionen ambos campos
      if (!email || !password) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      // Buscar el usuario por email
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      // Comparar la contraseña con el hash
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      // Generar token JWT
      const payload = { sub: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload);

      return { token };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        // Re-lanzamos la excepción ya identificada como Unauthorized
        throw error;
      }
      // Para otros errores no esperados (p.ej. error de DB),
      // generamos un InternalServerErrorException
      throw new InternalServerErrorException('Error during login process');
    }
  }
}
