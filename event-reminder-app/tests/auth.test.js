const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server'); // adjust to export app for testing

let server;

beforeAll(async () => {
  process.env.MONGO_URI = 'mongodb://127.0.0.1:27017/eventdb-test';
  server = app.listen(0);
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
  server.close();
});

describe('Auth', () => {
  it('should register a user', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password' });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it('should login a user', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});