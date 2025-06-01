// routes/profile.js
const express = require('express');
const Profile = require('../models/Profile');
const router = express.Router();

// Get a user's profile
router.get('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a user's profile
router.put('/:userId', async (req, res) => {
  try {
    const { name, email, bio, avatar } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId: req.params.userId },
      { name, email, bio, avatar },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
