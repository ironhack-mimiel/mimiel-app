const express    = require('express');
const router     = express.Router();
const Honey      = require('../models/Honey');

router.get('/', (req, res, next) => {
  Honey.find({}, (err, dishes) => {
    if (err) { return res.json(err).status(500); }
    return res.json(dishes);
  });
});

module.exports = router;