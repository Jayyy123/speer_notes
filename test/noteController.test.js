const assert = require('assert');
const { describe, it, before } = require('mocha');
const { app } = require('../src/app');
const request = require("supertest")
const { User, Note } = require('../src/models');

describe('Note Controller', function () {
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
    authToken = user.body.token;
  })


  describe('GET /api/notes', function () {
    it('should get a list of all notes for the authenticated user', async function () {
      
      const response = await request(app)
        .get('/api/notes')
        .set('Authorization', `Bearer ${authToken}`);

      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.error, false);
      assert.ok(response.body.notes);
    });
  });

  describe('GET /api/notes/:id', function () {
    it('should get a note by ID for the authenticated user', async function () {
      // Assuming you have a note in the database
      const note = await Note.create({ title: 'Test Note', content: 'Test Content', user_id });

      const response = await request(app)
        .get(`/api/notes/${note.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.error, false);
      assert.ok(response.body.note);

    });

    it('should handle getting a note by ID that does not exist', async function () {
      const response = await request(app)
        .get('/api/notes/12345')
        .set('Authorization', `Bearer ${authToken}`);

      assert.strictEqual(response.status, 404);
      assert.strictEqual(response.body.error, true);
      assert.strictEqual(response.body.message, 'Note not found');
    });
  });
});

