const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');

let server, token;

beforeAll(async () => {
  process.env.MONGO_URI = 'mongodb://127.0.0.1:27017/eventdb-test';
  server = app.listen(0);
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const res = await request(server)
    .post('/api/auth/register')
    .send({ email: 'user2@example.com', password: 'pass123' });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
  server.close();
});

describe('Events', () => {
  it('should create an event', async () => {
    const res = await request(server)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Meeting',
        description: 'Team sync',
        date: new Date(Date.now() + 3600000),
        reminderAt: new Date(Date.now() + 1800000),
        category: 'Meeting'
      });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Meeting');
  });

  it('should get events', async () => {
    const res = await request(server)
      .get('/api/events')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
