import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
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

    try {
      return await this.prisma.$transaction(async (tx) => {
        // 1) Crear la orden
        const order = await tx.order.create({
          data: {
            userId,
            addressId,
            // si no viene `status`, lo dejamos "PENDING"
            status: status ?? 'PENDING',
            total,
          },
        });

        // 2) Crear los orderItems
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
    } catch (error) {
      throw new InternalServerErrorException('Error creating order');
    }
  }

  /**
   * Retorna todas las órdenes (incluyendo user, address, orderItems => product)
   */
  async findAll(): Promise<Order[]> {
    try {
      return await this.prisma.order.findMany({
        include: {
          user: true,
          address: true,
          orderItems: {
            include: { product: true },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving orders');
    }
  }

  /**
   * Retorna una sola orden por su ID, o lanza NotFoundException
   */
  async findOne(id: number): Promise<Order> {
    try {
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
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // re-lanzamos la excepción
      }
      throw new InternalServerErrorException(`Error finding order with ID ${id}`);
    }
  }

  /**
   * Actualiza la orden y, opcionalmente, sus items (solo crea nuevos items).
   */
  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const { userId, addressId, status, total, orderItems } = updateOrderDto;

    try {
      return await this.prisma.$transaction(async (tx) => {
        // 1) Actualizar la orden principal
        const order = await tx.order.update({
          where: { id },
          data: {
            // si userId es un cambio que permites, lo asignas
            ...(userId && { userId }),
            ...(addressId !== undefined && { addressId }),
            ...(status && { status }),
            ...(total && { total }),
          },
        });

        if (!order) {
          throw new NotFoundException(`Order with ID ${id} not found`);
        }

        // 2) Manejo de orderItems (sólo se crean nuevos items)
        if (orderItems && orderItems.length > 0) {
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

        // 3) Retornar la orden actualizada
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
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error updating order with ID ${id}`);
    }
  }

  /**
   * Elimina la orden por ID (y sus items en cascada si configurado).
   */
  async remove(id: number): Promise<Order> {
    try {
      // Verificamos si existe
      const existing = await this.prisma.order.findUnique({
        where: { id },
      });
      if (!existing) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      return await this.prisma.order.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error deleting order with ID ${id}`);
    }
  }
}
