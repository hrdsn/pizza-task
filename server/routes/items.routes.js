const { Router } = require('express');
const router = Router();
const Item = require('../models/item');

router.get('/', (req, res) => {
  Item.find()
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const image_thumb = req.body.image_thumb;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const selected = req.body.selected;

  const newItem = new Item({
    id,
    title,
    description,
    image,
    image_thumb,
    price,
    quantity,
    selected,
  });

  newItem
    .save()
    .then(() => res.json('Item added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
