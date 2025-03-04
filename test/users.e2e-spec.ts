// fichero testing de users

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { after } from 'node:test';

describe('Users E2E', () => {
    let app: INestApplication;
    let server: any;

    // Varables to reuse in the tests
    let token: string;
    let userId: number;

    beforeAll(async () => {
        // Create the module for the testing
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        // Initiate the Nest App in test mode.
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());

        await app.init();
        // Use the Http Nest Server for supertest
        server = app.getHttpServer(); 
    });

    afterAll(async () => {
        await app.close();
    });

    // Init the testing modules.
    // 1. Create a user
    it('Create an user (POST /users/register)', async () => {
        const res = await request(server)
            .post('/users/register')
            .send({
                name: 'Oscar Arapio',
                email: 'oscar.example@correo.com',
                password: '123456oscar'
            })
            .expect(201);
        
        expect(res.body).toHaveProperty('id');
        expect(res.body.email).toBe('oscar.example@correo.com');

        // Save the userId to next testings.
        userId = res.body.id;
    });

    // 2. Login the user
    it('Login the user (POST /auth/login)', async () => {
        const res = await request(server)
            .post('/auth/login')
            .send({
                email: 'oscar.example@correo.com',
                password: '123456oscar'
            }).expect(200)

            // Must return the object with a 'token'
            expect(res.body).toHaveProperty('token');
            token = res.body.token;
    });

    // 3. Update the user data (protected with JWT)
    it('Update the user (PATCH /users/:id)', async () => {
        const updatedName = 'Oscar Arapio Updated';

        const res = await request(server)
            .patch(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: updatedName
            }).expect(200);
        
        // Verify that the answer is the updated name
        expect(res.body.name).toBe(updatedName);
    });

    // 4. Update the password
    it('Update the password (PATCH /users/:id/password)', async () => {
        const res = await request(server)
            .patch(`/users/${userId}/password`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                newPassword: '1234567oscar'
            }).expect(200);
        
        // Verify that the answer is the updated password
        expect(res.body).toHaveProperty('newPassword');
    });

    // 5. Deactivate the user
    it('Desactivar usuario (PATCH /users/:id/deactivate)', async () => {
        const res = await request(server)
          .patch(`/users/${userId}/deactivate`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200);
    
        expect(res.body.active).toBe(false);
    });

    // 6. Try to update the user data without a token.
    it('User update data without JWT Token (PATCH /users/:id)', async () => {
        await request(server)
          .patch(`/users/${userId}`)
          .send({ nombre: 'Fallo Sin Token' })
          .expect(401); // Unauthorized
    });
});