const { Router } = require('express');
const Toy = require('../models/Toys');

module.exports = Router()
  .post('/', async (req, res) => {
    const toy = await Toy.insert({
      product: req.body.product,
      quantity: req.body.quantity,
    });
    res.send(toy);
  })

  .get('/:id', async (req, res) => {
    const toy = await Toy.getById(req.params.id);
    res.send(toy);
  })

  .get('/', async (req, res) => {
    const toys = await Toy.getAll();
    res.send(toys);
  })

  .patch('/:id', async (req, res) => {
    const toy = await Toy.updateById(req.params.id, req.body);
    res.send(toy);
  });
