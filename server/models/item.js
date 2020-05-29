const { Schema, model } = require('mongoose');

const schema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  image_thumb: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  selected: { type: Boolean, required: true, default: false },
});

module.exports = model('Item', schema);
