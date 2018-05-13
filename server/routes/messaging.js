const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Messages = require('../models/Message');

router.post('/', (req, res, next) => {
  const { from, to, message } = req.body;
  if (!to || !from || !message) {
    res
      .status(400)
      .json({ message: 'Sorry, but one or more fields are empty' });
    return;
  }
  Messages.create({ from, to, message })
    .then(message =>
      res.status(200).json({ message: `Message created: ${message}` })
    )
    .catch(e => res.status(500).json({ message: e.message }));
});



module.exports = router;