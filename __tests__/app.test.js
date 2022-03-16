const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Toy = require('../lib/models/Toys');

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


  it('should list a toy by id', async () => {
    const toy = await Toy.insert({ product: 'tamagotchi', quantity: 1 });
    const res = await request(app).get(`/api/v1/toys/${toy.id}`);
    expect(res.body).toEqual(toy);
  });

  it('should be able to list toys', async () => {
    await Toy.insert({ product: 'tamagotchi', quantity: 1 });
    const res = await request(app).get('/api/v1/toys');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        product: 'tamagotchi',
        quantity: 1,
      },
    ]);
  });

  it('should update a toy', async () => {
    const toy = await Toy.insert({ product: 'tamagotchi', quantity: 1 });
    const res = await request(app)
      .patch(`/api/v1/toys/${toy.id}`)
      .send({ product: 'bopit', quantity: 2 });

    const expected = {
      id: expect.any(String),
      product: 'bopit',
      quantity: 2,
    };
    expect(res.body).toEqual(expected);
    expect(await Toy.getById(toy.id)).toEqual(expected);
  });

  it('should be able to delete a toy', async () => {
    const toy = await Toy.insert({ product: 'tamagotchi', quantity: 2 });
    const res = await request(app).delete(`/api/v1/toys/${toy.id}`);
    expect(res.body).toEqual(toy);
    expect(await Toy.getById(toy.id)).toBeNull();
  });
});
