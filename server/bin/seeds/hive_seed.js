require('dotenv').config();
const mongoose = require('mongoose');
const Hive = require('../../models/Hive');

const dbName = 'mimiel';
const hive_data = [
  {
    name: 'La Colmena de Prueba',
    description: 'Una colmena con miel',
    email: 'colmena@prueba.es',
    patrons: ["5af18dcea193841062d28d51"]
  },
  {
    name: 'Prueba2',
    description: 'Una colmena con miel',
    email: 'colmena@prueba.es'
  },
  {
    name: 'Prueba3',
    description: 'Una colmena con miel',
    email: 'colmena@prueba.es'
  }
];

mongoose.connect(`mongodb://localhost/${dbName}`).then(() => {
  useMongoClient: true;
  Hive.collection.drop();

  Hive.create(hive_data)
    .then(hive => {
      console.log(`All the centers inserted`, `Hive list: ${hive}`);
      mongoose.disconnect();
    })
    .catch(err => {
      console.log(err);
    });
});
