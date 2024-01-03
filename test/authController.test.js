const assert = require('assert');
const { describe, it } = require('mocha');
const request = require('supertest'); 
const { User } = require('../src/models');
const { app } = require('../src/app');

describe('Auth Controller', function () {
  let createdUserId;
  describe('POST /api/auth/signup', function () {
    it('should create a new user account', async function () {
      const userData = {
        username: 'testuser1',
        password: 'testpassword',
        email: 'test1@example.com',
      };

      const response = await request(app)
      .post('/api/auth/signup')
      .send(userData);

      createdUserId = response.body.user.id;

      assert.strictEqual(response.status, 201);
      assert.strictEqual(response.body.error, false);
      assert.strictEqual(response.body.message, 'User created successfully');
      assert.strictEqual(typeof response.body.user, 'object');
    });
  });

  describe('POST /api/auth/login', function () {
    it('should log in to an existing user account and receive an access token', async function () {
      const userData = {
        username: 'testuser1',
        password: 'testpassword',
      };


      const response = await request(app)
        .post('/api/auth/login')
        .send(userData);

      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.error, false);
      assert.strictEqual(response.body.message, 'Login successful');
      assert.strictEqual(typeof response.body.token, 'string');
    });

    it('should handle invalid username or password', async function () {
      const userData = {
        username: 'nonexistentuser',
        password: 'wrongpassword',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(userData);

      assert.strictEqual(response.status, 401);
      assert.strictEqual(response.body.error, true);
      assert.strictEqual(response.body.message, 'Invalid username or password');
      this.token = response.body.token;
    });
  });

  after(async function () {
    console.log("found")
    if (createdUserId) {
      console.log(`Deleting user ${createdUserId}`);
      this.currentTestUserId = createdUserId;
      console.log(this.currentTestUserId)
    }
  });
});
