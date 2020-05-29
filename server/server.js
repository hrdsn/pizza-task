const config = require('config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = config.get('port') || 5000;
const DB = config.get('mongoURI');
const itemsRouter = require('./routes/items.routes')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/items', itemsRouter);

async function start() {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log('Server is running on Port:', PORT);
    });
  } catch (e) {
    console.error('Server Error', e.message);
    process.exit(1);
  }
}

start();
