// test/product.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Product E2E', () => {
  let app: INestApplication;
  let createdProductId: number;

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

  it('should create a product (POST /products)', async () => {
    const productData = {
      name: 'Test Product',
      description: 'Sample desc',
      price: 100.5,
      userId: 1, // Ajusta si tu user 1 existe
    };

    const res = await request(app.getHttpServer())
      .post('/products')
      .send(productData)
      .expect(201);

    createdProductId = res.body.id;
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Product');
  });

  it('should get all products (GET /products)', async () => {
    const res = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a specific product (GET /products/:id)', async () => {
    const res = await request(app.getHttpServer())
      .get(`/products/${createdProductId}`)
      .expect(200);

    expect(res.body.id).toBe(createdProductId);
    expect(res.body.name).toBe('Test Product');
  });

  it('should update a product (PATCH /products/:id)', async () => {
    const updateData = {
      name: 'Updated Product Name',
      price: 150.0,
    };

    const res = await request(app.getHttpServer())
      .patch(`/products/${createdProductId}`)
      .send(updateData)
      .expect(200);

    expect(res.body.name).toBe('Updated Product Name');
    expect(res.body.price).toBe(150.0);
  });

  it('should delete a product (DELETE /products/:id)', async () => {
    await request(app.getHttpServer())
      .delete(`/products/${createdProductId}`)
      .expect(200);

    // Verificar que ya no existe
    await request(app.getHttpServer())
      .get(`/products/${createdProductId}`)
      .expect(404);
  });
});
