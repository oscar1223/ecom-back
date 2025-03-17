// test/category.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'; // Ajusta la ruta según tu proyecto

describe('Category E2E', () => {
  let app: INestApplication;
  let createdCategoryId: number;

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

  it('should create a new category (POST /categories)', async () => {
    const res = await request(app.getHttpServer())
      .post('/categories')
      .send({
        name: 'Test Category',
        description: 'Some description',
      })
      .expect(201);

    // Guardar el ID para pruebas posteriores
    createdCategoryId = res.body.id;

    expect(res.body.name).toBe('Test Category');
    expect(res.body.id).toBeDefined();
  });

  it('should get all categories (GET /categories)', async () => {
    const res = await request(app.getHttpServer())
      .get('/categories')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    // Podrías comprobar que contiene la categoría creada
    // p.e., un find en res.body
  });

  it('should get a specific category (GET /categories/:id)', async () => {
    const res = await request(app.getHttpServer())
      .get(`/categories/${createdCategoryId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdCategoryId);
    expect(res.body).toHaveProperty('name', 'Test Category');
  });

  it('should update a category (PATCH /categories/:id)', async () => {
    const updatedName = 'Updated Category';

    const res = await request(app.getHttpServer())
      .patch(`/categories/${createdCategoryId}`)
      .send({ name: updatedName })
      .expect(200);

    expect(res.body.name).toBe(updatedName);
  });

  it('should delete a category (DELETE /categories/:id)', async () => {
    await request(app.getHttpServer())
      .delete(`/categories/${createdCategoryId}`)
      .expect(200);

    // Verificar que ya no existe
    await request(app.getHttpServer())
      .get(`/categories/${createdCategoryId}`)
      .expect(404);
  });
});
