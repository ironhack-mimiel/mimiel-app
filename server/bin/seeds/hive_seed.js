require('dotenv').config();
const mongoose = require('mongoose');
const Hive = require('../../models/Hive');

const dbName = 'mimiel';
const hive_data = [
  {
    name: 'La Colmena de Prueba',
    description: 'Una colmena con miel',
    email: 'colmena@prueba.es',
    patrons: ["5af18dcea193841062d28d51"],
    rpi: "5af2e6fb117a0c1139b962bd",

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

mongoose.connect(`mongodb://206.189.26.38/mimiel`).then(() => {
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
