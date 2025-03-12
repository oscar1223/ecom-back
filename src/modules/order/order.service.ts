import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea una orden y sus items en una sola transacción
   */
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, addressId, status, total, orderItems } = createOrderDto;

    // Ejemplo: calculas 'total' en backend si deseas (aquí asumimos que viene en el DTO)
    // Realizamos todo en una transacción para asegurar consistencia
    return this.prisma.$transaction(async (tx) => {
      // 1) Crear la orden
      const order = await tx.order.create({
        data: {
          userId,
          addressId,
          // Si no viene status en el DTO, dejamos "PENDING"
          status: status ?? 'PENDING',
          total,
        },
      });

      // 2) Crear los orderItems en un Promise.all
      await Promise.all(
        orderItems.map((item) =>
          tx.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            },
          }),
        ),
      );

      return order;
    });
  }

  /**
   * Retorna todas las órdenes (incluyendo los user, address y orderItems con product si lo deseas)
   */
  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: {
        user: true,
        address: true,
        orderItems: {
          include: { product: true },
        },
      },
    });
  }

  /**
   * Retorna una sola orden por su ID, o lanza NotFoundException
   */
  async findOne(id: number): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        address: true,
        orderItems: {
          include: { product: true },
        },
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  /**
   * Actualiza la orden y, opcionalmente, sus items.
   * Ejemplo simplificado:
   * - Actualiza 'status', 'total', 'addressId' si vienen
   * - Maneja 'orderItems' para crear items nuevos. 
   *   (No se muestra lógica para borrar/edit items existentes.)
   */
  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const { userId, addressId, status, total, orderItems } = updateOrderDto;

    // A menudo, es útil usar un approach de transacción
    return this.prisma.$transaction(async (tx) => {
      // 1) Actualizar la orden principal
      const order = await tx.order.update({
        where: { id },
        data: {
          // si userId es un cambio que permites, ajústalo
          ...(userId && { userId }),
          ...(addressId !== undefined && { addressId }), // si addressId es null, permites desconectar
          ...(status && { status }),
          ...(total && { total }),
        },
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      // 2) Manejo de orderItems (ejemplo: solo crea nuevos items)
      if (orderItems && orderItems.length > 0) {
        // Creación de items adicionales
        await Promise.all(
          orderItems.map((item) =>
            tx.orderItem.create({
              data: {
                orderId: id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price ?? 0,
              },
            }),
          ),
        );
      }

      // 3) Retornar la orden actualizada (con includes)
      const updatedOrder = await tx.order.findUnique({
        where: { id },
        include: {
          user: true,
          address: true,
          orderItems: {
            include: { product: true },
          },
        },
      });

      return updatedOrder!;
    });
  }

  /**
   * Elimina la orden por ID (y sus items en cascada si está en tu esquema con onDelete cascade,
   * o manualmente).
   */
  async remove(id: number): Promise<Order> {
    // Primero, opcional: check si existe
    const existing = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Eliminar
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
