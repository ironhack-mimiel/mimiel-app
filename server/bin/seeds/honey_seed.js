require('dotenv').config();
const mongoose = require('mongoose');
const Honey = require('../../models/Honey');

const dbName = 'mimiel';
const honey_data = [
  {
    name: 'Miel1',
    type: 'Milflores',
    hive: "5af1cec17933f275b158f04c"
  },
  {
    name: 'Miel2',
    type: 'Azucarada',

  },
  {
    name: 'Miel3',
    type: 'Negra',
  }
];

mongoose.connect(`mongodb://localhost/${dbName}`).then(() => {
  useMongoClient: true;
  Honey.collection.drop();

  Honey.create(honey_data)
    .then(honey => {
      console.log(`All the honey inserted`, `Honey list: ${honey}`);
      mongoose.disconnect();
    })
    .catch(err => {
      console.log(err);
    });
});
