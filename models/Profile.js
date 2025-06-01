// models/Profile.js
const mongoose = require('mongoose');

// Define the Profile schema
const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming you're linking to a User model
  name: { type: String, required: true },
  email: { type: String, required: true },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' }, // A URL to the user's avatar image
  createdAt: { type: Date, default: Date.now },
});

// Create and export the Profile model
const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
