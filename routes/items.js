const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const Item = require('../models/Items');

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.body.title || !req.body.price || !req.body.category || !req.body.seller) {
      return res.status(400).send({ message: 'Please provide all required fields' });
    }

    if (!req.file) {
      return res.status(400).send({ message: 'Please provide an image' });
    }

    const item = new Item({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.file.filename,
      category: req.body.category,
      seller: req.body.seller
    });

    const savedItem = await item.save();
    res.send(savedItem);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error creating item' });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 }).populate('seller');
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching items' });
  }
});

module.exports = router;