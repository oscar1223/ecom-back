// src/payment/payment.controller.ts
import { Controller, Post, Body, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  /**
   * Crea PaymentIntent para un Order con un ID dado
   */
  @Post('create-intent/:orderId')
  async createIntent(@Param('orderId') orderId: number) {
    const paymentIntent = await this.paymentService.createPaymentIntent(orderId);
    // Devuelves `client_secret` para que el frontend lo use
    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  }
}
