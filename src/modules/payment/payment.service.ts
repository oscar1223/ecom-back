// src/payment/payment.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from 'src/prisma/prisma.service'; // si vas a actualizar orders en la DB

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2022-11-15',
    });
  }

  /**
   * Crea un Payment Intent en Stripe basado en el total del pedido, etc.
   */
  async createPaymentIntent(orderId: number) {
    // 1) Consultas tu DB para obtener la order y su total
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    // order.total es Decimal, la pasamos a centavos si usas USD, etc.
    // Suponiendo order.total se guarda como string
    const amount = parseFloat(order.total) * 100; // => 120.5 => 12050 centavos

    // 2) Llamar a Stripe para crear PaymentIntent
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount), // entero
      currency: 'usd',
      // Podrías pasar `customer`, `metadata`, etc.
      metadata: {
        orderId: order.id.toString(),
      },
    });

    return paymentIntent;
  }

  /**
   * Confirma el Payment Intent en servidor, si usas confirmación server-side.
   */
  async confirmPaymentIntent(paymentIntentId: string) {
    // Llamas a Stripe para confirmar
    const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId);

    return paymentIntent;
  }

  /**
   * Manejar Webhooks (opcional) para actualizar el estado del pedido
   * cuando el pago sea capturado, etc.
   */
  async handleWebhook(signature: string, payload: Buffer) {
    // ...
  }
}

