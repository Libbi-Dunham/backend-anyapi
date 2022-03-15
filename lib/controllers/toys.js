const { Router } = require('express');
const Toy = require('../models/Toys');

module.exports = Router().post('/', async (req, res) => {
  const toy = await Toy.insert({
    product: req.body.product,
    quantity: req.body.quantity,
  });
  res.send(toy);
});
