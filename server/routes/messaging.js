const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Messages = require('../models/Message');

//Create new Message
router.post('/', (req, res, next) => {
  const { from, to, hive, message } = req.body;
  if (!to || !from || !message) {
    res
      .status(400)
      .json({ message: 'Sorry, but one or more fields are empty' });
    return;
  }
  Messages.create({ from, to, message, hive })
    .then(message =>
      res
        .status(200)
        .json({ message: `Message sent succesfuly to user: ${message}` })
    )
    .catch(e => res.status(500).json({ message: e.message }));
});

// Get received messages
router.get('/received/:id', (req, res, next) => {
  Messages.find({ to: req.params.id })
    .populate({
      path: 'from',
      select: 'name surname email',
    })
    .populate('hive')
    .then(messages => {
      messages == []
        ? res.status(200).json({ message: 'The user has no received messages' })
        : res.status(200).json(messages);
    })
    .catch(e => res.status(500).json({ message: e.message }));
});

// Get sent messages
router.get('/sent/:id', (req, res, next) => {
  Messages.find({ from: req.params.id })
    .populate({
      path: 'to',
      select: 'name surname email -_id',
    })
    .then(messages => {
      messages == []
        ? res.status(200).json({ message: 'The user has no sent messages' })
        : res.status(200).json(messages);
    })
    .catch(e => res.status(500).json({ message: e.message }));
});

// Mark messsage as read
router.get('/:id', (req, res, next) => {
  Messages.findByIdAndUpdate(req.params.id, {isRead: true}, {new: true})
    .then( message => res.status(200).json({ message: 'Message marked as read' })
    )
    .catch(e => res.status(500).json({ message: e.message }));
});

// Delete a message
router.delete('/:id', (req, res, next) => {
  Messages.findByIdAndRemove(req.params.id)
    .then(() =>
      res.status(200).json({ message: 'Message deleted succesfully' })
    )
    .catch(e => res.status(500).json({ message: e.message }));
});
module.exports = router;
