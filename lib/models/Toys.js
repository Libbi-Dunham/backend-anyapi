const pool = require('../utils/pool');

module.exports = class Toy {
  id;
  product;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.product = row.product;
    this.quantity = row.quantity;
  }

  static async insert({ product, quantity }) {
    const { rows } = await pool.query(
      'INSERT INTO toys(product, quantity) VALUES ($1, $2) RETURNING *;',
      [product, quantity]
    );
    return new Toy(rows[0]);
  }
};
