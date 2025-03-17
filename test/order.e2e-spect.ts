// test/order.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'; // Ajusta la ruta

describe('Order E2E', () => {
  let app: INestApplication;
  let createdOrderId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create an order (POST /orders)', async () => {
    // Asume que tienes userId=1 y productId=1 en tu DB, ajusta según necesites
    const orderData = {
      userId: 1,
      addressId: 1, // si usas direcciones, ajusta ID
      total: '199.99',
      orderItems: [
        {
          productId: 1,
          quantity: 2,
          price: 99.99,
        },
      ],
    };

    const res = await request(app.getHttpServer())
      .post('/orders')
      .send(orderData)
      .expect(201);

    createdOrderId = res.body.id;
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('status', 'PENDING'); // Por defecto, si no se envía
  });

  it('should get all orders (GET /orders)', async () => {
    const res = await request(app.getHttpServer())
      .get('/orders')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    // Se podría comprobar si hay al menos 1 orden
  });

  it('should get a specific order (GET /orders/:id)', async () => {
    const res = await request(app.getHttpServer())
      .get(`/orders/${createdOrderId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdOrderId);
    expect(res.body).toHaveProperty('orderItems');
    // Podrías chequear user, address, etc.
  });

  it('should update an order (PATCH /orders/:id)', async () => {
    const updateData = {
      status: 'PAID',
      total: '299.99',
      orderItems: [
        {
          productId: 2,
          quantity: 1,
          price: 50,
        },
      ],
    };

    const res = await request(app.getHttpServer())
      .patch(`/orders/${createdOrderId}`)
      .send(updateData)
      .expect(200);

    expect(res.body.status).toBe('PAID');
    expect(res.body.total).toBe('299.99');
    // orderItems debe incluir lo nuevo creado
  });

  it('should delete an order (DELETE /orders/:id)', async () => {
    await request(app.getHttpServer())
      .delete(`/orders/${createdOrderId}`)
      .expect(200);

    // Verificar que ya no existe
    await request(app.getHttpServer())
      .get(`/orders/${createdOrderId}`)
      .expect(404);
  });
});
