import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea una nueva dirección
   */
  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const { userId, street, city, state, zipCode, country, isPrimary } = createAddressDto;

    try {
      // Aquí podrías verificar que userId existe, etc. (opcional)
      return await this.prisma.address.create({
        data: {
          userId,
          street,
          city,
          state,
          zipCode,
          country,
          isPrimary,
        },
      });
    } catch (error) {
      // Maneja casos específicos, p. ej. violaciones de constraints
      // o usuarios no encontrados (si lo chequeas manualmente)
      throw new InternalServerErrorException('Error creating address');
    }
  }

  /**
   * Retorna todas las direcciones
   * Incluyendo la relación con usuario y orders si deseas
   */
  async findAll(): Promise<Address[]> {
    try {
      return await this.prisma.address.findMany({
        include: {
          user: true,
          orders: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving addresses');
    }
  }

  /**
   * Retorna una dirección específica por su ID,
   * o lanza NotFoundException si no existe
   */
  async findOne(id: number): Promise<Address> {
    try {
      const address = await this.prisma.address.findUnique({
        where: { id },
        include: {
          user: true,
          orders: true,
        },
      });

      if (!address) {
        throw new NotFoundException(`Address with ID ${id} not found`);
      }
      return address;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // re-lanzamos la NotFoundException que ya creamos
      }
      throw new InternalServerErrorException(`Error finding address with ID ${id}`);
    }
  }

  /**
   * Actualiza los campos de una dirección
   */
  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
    try {
      const existing = await this.prisma.address.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException(`Address with ID ${id} not found`);
      }

      return await this.prisma.address.update({
        where: { id },
        data: {
          ...updateAddressDto, // userId, street, city, state, zipCode, country, isPrimary
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error updating address with ID ${id}`);
    }
  }

  /**
   * Elimina una dirección por su ID
   */
  async remove(id: number): Promise<Address> {
    try {
      const existing = await this.prisma.address.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException(`Address with ID ${id} not found`);
      }

      return await this.prisma.address.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error deleting address with ID ${id}`);
    }
  }
}
