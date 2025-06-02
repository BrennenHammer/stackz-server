const Item = require('../models/Items');

// @desc    Create new item
// @route   POST /api/items
// @access  Public (or use middleware for protected route)
const createItem = async (req, res) => {
  try {
    const { title, description, price, category, seller } = req.body;

    if (!title || !price || !category || !seller) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please provide an image' });
    }

    const item = new Item({
      title,
      description,
      price,
      image: req.file.filename,
      category,
      seller
    });

    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error('Create Item Error:', err);
    res.status(500).json({ message: 'Server error while creating item' });
  }
};

// @desc    Get all items
// @route   GET /api/items
// @access  Public
const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 }).populate('seller');
    res.json(items);
  } catch (err) {
    console.error('Get Items Error:', err);
    res.status(500).json({ message: 'Server error while fetching items' });
  }
};

module.exports = {
  createItem,
  getItems
};
