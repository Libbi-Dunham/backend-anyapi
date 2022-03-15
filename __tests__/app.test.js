const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-anyapi routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a toy', async () => {
    const res = await request(app)
      .post('/api/v1/toys')
      .send({ product: 'tamagotchi', quantity: 1 });

    expect(res.body).toEqual({
      id: expect.any(String),
      product: 'tamagotchi',
      quantity: 1,
    });
  });
});
