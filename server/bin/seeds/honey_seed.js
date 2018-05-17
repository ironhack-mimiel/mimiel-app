require('dotenv').config();
const mongoose = require('mongoose');
const Honey = require('../../models/Honey');
const honey_data = require('./honey_dataextra')

const dbName = 'mimiel';

mongoose.connect(`mongodb://206.189.26.38/mimiel`).then(() => {
  useMongoClient: true;


  Honey.create(honey_data)
    .then(honey => {
      console.log(`All the honey inserted`, `Honey list: ${honey}`);
      mongoose.disconnect();
    })
    .catch(err => {
      console.log(err);
    });
});
