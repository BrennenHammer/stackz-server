const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

const { createItem, getItems } = require('../controllers/itemController');

// Optional: add protect middleware if you want only logged-in users to create items
// const protect = require('../middleware/authMiddleware');

router.post('/', upload.single('image'), createItem);
router.get('/', getItems);

module.exports = router;
