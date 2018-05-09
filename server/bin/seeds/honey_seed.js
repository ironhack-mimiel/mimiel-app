require('dotenv').config();
const mongoose = require('mongoose');
const Honey = require('../../models/Honey');

const dbName = 'mimiel';
const honey_data = [
  {
    name: 'Miel1',
    type: 'Milflores',
    hive: "5af1cec17933f275b158f04c",
    pictureUrl:"https://ideon.co.uk/media/catalog/product/cache/1/image/900x760/9df78eab33525d08d6e5fb8d27136e95/h/a/half_honey_full.jpg"
  },
  {
    name: 'Miel2',
    type: 'Azucarada',
    pictureUrl:"https://d1ycl3zewbvuig.cloudfront.net/images/products/11/LN_551421_BP_11.jpg"
  },
  {
    name: 'Miel3',
    type: 'Negra',
    pictureUrl:"https://mielcruda.es/24-large_default/venta-miel-casera-de-milflores-cruda.jpg"
  }
];

mongoose.connect(`mongodb://206.189.26.38/mimiel`).then(() => {
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
