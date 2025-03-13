import { Injectable, NotFoundException } from '@nestjs/common';
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

    // Aquí podrías verificar que userId existe, etc. (opcional)
    return this.prisma.address.create({
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
  }

  /**
   * Retorna todas las direcciones
   * Incluyendo la relación con usuario y orders si deseas
   */
  async findAll(): Promise<Address[]> {
    return this.prisma.address.findMany({
      include: {
        user: true,
        orders: true,
      },
    });
  }

  /**
   * Retorna una dirección específica por su ID,
   * o lanza NotFoundException si no existe
   */
  async findOne(id: number): Promise<Address> {
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
  }

  /**
   * Actualiza los campos de una dirección
   */
  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
    // Verificamos si existe
    const existing = await this.prisma.address.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    return this.prisma.address.update({
      where: { id },
      data: {
        ...updateAddressDto, // userId, street, city, state, zipCode, country, isPrimary
      },
    });
  }

  /**
   * Elimina una dirección por su ID
   */
  async remove(id: number): Promise<Address> {
    // Verificamos si existe
    const existing = await this.prisma.address.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    return this.prisma.address.delete({
      where: { id },
    });
  }
}
