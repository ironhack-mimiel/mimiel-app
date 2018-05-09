const express    = require('express');
const router     = express.Router();
const Honey      = require('../models/Honey');

router.get('/', (req, res, next) => {
  Honey.find({}, (err, dishes) => {
    if (err) { return res.json(err).status(500); }
    return res.json(dishes);
  });
});

router.get('/:id', (req, res, next) => {
  Honey.findById(req.params.id)
    .populate('hives.hiveId')
    .exec((err, honey) => {
      if (err)         { return res.status(500).json(err); }
      if (!honey)      { return res.status(404).json(new Error("404")) }

      return res.json(honey);
    });
});

module.exports = router;