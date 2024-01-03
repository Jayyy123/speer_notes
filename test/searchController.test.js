const assert = require('assert');
const { describe, it } = require('mocha');
const { app } = require('../src/app');
const request = require('supertest'); 
const { Note, User } = require('../src/models');

describe('Search Controller', function () {
  let authToken; // To store the authentication token for the user
  let user_id ;

  authToken = this.token
  user_id = this.currentTestUserId;
  before(async function () {
    // Assuming you have a user in the database
    const userData = {
      username: 'testuser1',
      password: 'testpassword',
      email: 'test1@example.com',
    };
    const user = await request(app)
      .post('/api/auth/login')
      .send(userData);
    user_id = user.body.user_id;
    // Assuming you have an authentication token for the user
    authToken = user.body.token;
  })

  describe('GET /api/search', function () {
    it('should search for notes based on keywords for the authenticated user', async function () {
      // Assuming you have a user and some notes in the database
      // const user = await User.create({ username: 'testuser', password: 'testpassword' });
      const note1 = await Note.create({ title: 'Note 1', content: 'Content 1', user_id: user_id });
      const note2 = await Note.create({ title: 'Note 2', content: 'Content 2', user_id: user_id });

      const searchQuery = 'Note'; // Adjust the search query based on your test data

      const response = await request(app)
        .get(`/api/search?q=${searchQuery}`)
        .set('Authorization', `Bearer ${authToken}`); // Use the extracted token from signup

      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.error, false);
      assert.ok(response.body.notes);

    });

    it('should handle missing search query parameter', async function () {
      const response = await request(app)
        .get('/api/search')
        .set('Authorization', `Bearer ${authToken}`); // Use the extracted token from signup

      assert.strictEqual(response.status, 400);
      assert.strictEqual(response.body.error, true);
      assert.strictEqual(response.body.message, 'Search query parameter is missing');
    });
  });

  after(async function () {
    if (user_id) {
      // Use Sequelize to directly delete the user from the database
      await User.destroy({ where: { id: user_id } });
      await Note.destroy({ where: { user_id } });
    }
  });

});
