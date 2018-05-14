const express = require('express');
const router = express.Router();
const Honey = require('../models/Honey');
const Hive = require('../models/Hive');
const Rpi = require('../models/Rpi');
const User = require('../models/User');
const uploadCloud = require("../config/cloudinary.js");



router.get('/', (req, res, next) => {
  Honey.find({}, (err, hives) => {
    if (err) {
      return res.json(err).status(500);
    }
    return res.json(hives);
  });
});

router.get('/:id', (req, res, next) => {
  Hive.findById(req.params.id)
    .populate('rpi')
    .exec((err, hive) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!hive) {
        return res.status(404).json(new Error('404'));
      }
      return res.json(hive);
    });
});

router.get('/user/:id', (req, res, next) => {
  Hive.find({ patrons: req.params.id })
    .then(hives => res.status(200).json(hives))
    .catch(error => res.status(500).json(err))
});

router.post('/new', (req, res, next) => {
  
  const data = req.body;

  Hive.findOne({ name: data.name })
    .then(hive => {
      if (hive) throw new Error('This hive name is already in use');

      const theHive = new Hive(data);

      return theHive.save();
    })
    .then(hive => res.status(200).json(hive))
    .catch(e => res.status(500).json({ message: e.message }));
});

router.post('/newhivepics/:hivename', uploadCloud.single('file'),(req, res, next) => {
  console.log(req.file.url)
  Hive.findOneAndUpdate({ name: req.params.hivename }, {picturesURL: req.file.url}, {new: true})
    .then(hive => res.status(200).json(hive))
    .catch(error => res.status(500).json(error));
});

module.exports = router;
