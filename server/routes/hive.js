const express    = require('express');
const router     = express.Router();
const Honey      = require('../models/Honey');
const Hive = require("../models/Hive");

router.get('/', (req, res, next) => {
  Honey.find({}, (err, hives) => {
    if (err) { return res.json(err).status(500); }
    return res.json(hives);
  });
});

router.get('/:id', (req, res, next) => {
  Hive.findById(req.params.id)
    .exec((err, hive) => {
      if (err)         { return res.status(500).json(err); }
      if (!hive)      { return res.status(404).json(new Error("404")) }
      return res.json(hive);
    });
});

module.exports = router;