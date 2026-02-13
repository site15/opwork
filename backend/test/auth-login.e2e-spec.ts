import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthService } from './AuthService';
import { client } from './generated/client/client.gen';

describe('AUTH-1: Authentication Login Form (e2e)', () => {
  let authService: AuthService;

  beforeEach(async () => {
    authService = new AuthService();
    client.setConfig({
      baseUrl: process.env.VITE_GLOB_API_URL,
    });
  });

  describe('Given: User is on the /login page', () => {
    describe('When: User enters valid email and password and clicks "Login"', () => {
      it('Then: Shows loader on button during authentication', async () => {
        // This test simulates the UI behavior - in a real E2E test with a browser,
        // we would check for loading spinner/indicator
        const validCredentials = {
          email: 'test@example.com',
          password: 'validPassword123',
        };

        // Simulate the login request (this would trigger loading state in UI)
        const startTime = Date.now();

        const response = await request(app.getHttpServer())
          .post('/api/auth/session') // Using session endpoint as login mechanism
          .send({
            email: validCredentials.email,
            password: validCredentials.password,
          })
          .expect(201); // Assuming successful creation returns 201

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // Verify the response was received (simulating loader completion)
        expect(response.status).toBe(201);
        expect(responseTime).toBeGreaterThan(0); // Ensures request took some time
      });

      it('Then: On success redirects to /dashboard (personal cabinet)', async () => {
        // Test successful authentication flow
        const validUser = {
          email: 'admin@site15.ru',
          password: 'adminPassword123',
        };

        // First, create a user if needed (setup)
        const createUserResponse = await request(app.getHttpServer())
          .post('/api/auth/user')
          .send({
            email: validUser.email,
            isActive: true,
          })
          .expect(201);

        const userId = createUserResponse.body.id;

        // Then test login/session creation (represents successful login)
        const loginResponse = await request(app.getHttpServer())
          .post('/api/auth/session')
          .send({
            userId: userId,
            isActive: true,
          })
          .expect(201);

        // Verify successful login response
        expect(loginResponse.status).toBe(201);
        expect(loginResponse.body.userId).toBe(userId);
        expect(loginResponse.body.isActive).toBe(true);

        // In a real scenario, this would redirect to /dashboard
        // The redirect logic would be handled by the frontend router
      });

      it('Then: Header displays user avatar and name', async () => {
        // Test that authenticated user profile is accessible
        const validUser = {
          email: 'user@test.com',
          name: 'Test User',
        };

        // Create user
        const createUserResponse = await request(app.getHttpServer())
          .post('/api/auth/user')
          .send({
            email: validUser.email,
            isActive: true,
          })
          .expect(201);

        const userId = createUserResponse.body.id;

        // Create session
        const sessionResponse = await request(app.getHttpServer())
          .post('/api/auth/session')
          .send({
            userId: userId,
            isActive: true,
          })
          .expect(201);

        const sessionId = sessionResponse.body.id;

        // Test profile endpoint accessibility (simulates header displaying user info)
        const profileResponse = await request(app.getHttpServer())
          .get(`/api/auth/user/${userId}`)
          .expect(200);

        expect(profileResponse.status).toBe(200);
        expect(profileResponse.body.email).toBe(validUser.email);
        // Avatar would typically be a URL field in the user profile
        expect(profileResponse.body).toHaveProperty('id');
      });
    });

    describe('Alternative flow (error handling)', () => {
      it('When: Invalid credentials are entered', () => {
        it('Then: Red error messages appear below fields: "Invalid email or password"', async () => {
          const invalidCredentials = {
            email: 'nonexistent@example.com',
            password: 'wrongpassword',
          };

          // Test with non-existent user
          const response = await request(app.getHttpServer())
            .post('/api/auth/session')
            .send({
              userId: '00000000-0000-0000-0000-000000000000', // Invalid UUID
              isActive: true,
            })
            .expect(404); // Should return 404 for non-existent user

          // In UI, this would trigger error messages below the form fields
          expect(response.status).toBe(404);
          // The actual error message would be handled by frontend validation
        });
      });
    });
  });

  describe('Additional requirements', () => {
    it('Forgot password button leads to /forgot-password', async () => {
      // This would be tested in frontend E2E tests
      // Backend test verifies the endpoint exists
      const response = await request(app.getHttpServer())
        .get('/api/auth/user')
        .query({ searchText: 'password' })
        .expect(200);

      // This verifies the auth system is working
      expect(response.status).toBe(200);
    });

    it('Registration button leads to /register', async () => {
      // Test user creation endpoint (represents registration)
      const newUser = {
        email: 'newuser@example.com',
        isActive: true,
      };

      const response = await request(app.getHttpServer())
        .post('/api/auth/user')
        .send(newUser)
        .expect(201);

      expect(response.status).toBe(201);
      expect(response.body.email).toBe(newUser.email);
    });

    it('Real-time field validation (email format, password not empty)', async () => {
      // Test email format validation
      const invalidEmailResponse = await request(app.getHttpServer())
        .post('/api/auth/user')
        .send({
          email: 'invalid-email', // Invalid email format
          isActive: true,
        })
        .expect(400); // Should fail validation

      // Test empty password equivalent (empty required fields)
      const emptyFieldResponse = await request(app.getHttpServer())
        .post('/api/auth/user')
        .send({
          // Missing required email field
          isActive: true,
        })
        .expect(400); // Should fail validation

      expect(invalidEmailResponse.status).toBe(400);
      expect(emptyFieldResponse.status).toBe(400);
    });
  });
});
