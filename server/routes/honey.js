const express    = require('express');
const router     = express.Router();
const Honey = require("../models/Honey");
const uploadCloud = require('../config/cloudinary.js');

router.get('/', (req, res, next) => {
  Honey.find({}, (err, honeys) => {
    if (err) { return res.json(err).status(500); }
    return res.json(honeys);
  });
});

router.get('/:id', (req, res, next) => {
  Honey.findById(req.params.id)
    .populate('hive')
    .exec((err, honey) => {
      if (err)         { return res.status(500).json(err); }
      if (!honey)      { return res.status(404).json(new Error("404")) }
      return res.json(honey);
    });
});

router.post('/new', (req, res, next) => {

  const data = req.body;

  Honey.findOne({ name: data.name })
    .then(honey => {
      if (honey) throw new Error('This honey name is already in use');

      const theHoney = new Honey(data);

      return theHoney.save();
    })
    .then(honey => res.status(200).json(honey))
    .catch(e => res.status(500).json({ message: e.message }));
});

router.post('/newhoneypics/:honeyname', uploadCloud.single('file'), (req, res, next) => {
  console.log(req.file.url)
  console.log("hola");
  Honey.findOneAndUpdate({ name: req.params.honeyname }, { pictureURL: req.file.url }, { new: true })
    .then(honey => res.status(200).json(honey))
    .catch(error => res.status(500).json(error));
});

module.exports = router;