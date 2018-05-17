require('dotenv').config();
const mongoose = require('mongoose');
const Hive = require('../../models/Hive');
const hive_data = require('./hive_dataextra')

const dbName = 'mimiel';

mongoose.connect(`mongodb://206.189.26.38/mimiel`).then(() => {
  useMongoClient: true;

  Hive.create(hive_data)
    .then(hive => {
      console.log(`All the centers inserted`, `Hive list: ${hive}`);
      mongoose.disconnect();
    })
    .catch(err => {
      console.log(err);
    });
});
