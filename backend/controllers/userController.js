const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage }).fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'shopBackgroundPhoto', maxCount: 1 }
]);

const updateUserProfile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { firstName, lastName, email, phoneNumber, address, bankDetails } = req.body;
    const updateFields = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      bankDetails,
    };

    if (req.files.profilePhoto) {
      updateFields.profilePhoto = req.files.profilePhoto[0].path;
    }
    if (req.files.shopBackgroundPhoto) {
      updateFields.shopBackgroundPhoto = req.files.shopBackgroundPhoto[0].path;
    }

    try {
      const user = await User.findByIdAndUpdate(req.user._id, updateFields, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports = {
  updateUserProfile,
};
