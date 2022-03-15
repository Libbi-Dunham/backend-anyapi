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

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM toys WHERE id=$1', [id]);
    return new Toy(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM toys;');
    return rows.map((row) => new Toy(row));
  }

  static async updateById(id, { product, quantity }) {
    const existingToy = await Toy.getById(id);

    if (!existingToy) return null;

    const newProduct = product ?? existingToy.product;
    const newQuantity = quantity ?? existingToy.quantity;

    const { rows } = await pool.query(
      'UPDATE toys SET product=$2, quantity=$3 WHERE id=$1 RETURNING *;',
      [id, newProduct, newQuantity]
    );
    return new Toy(rows[0]);
  }
};
