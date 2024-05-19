const Device = require('../models/Device');
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

const upload = multer({ storage }).array('photos', 10); // Handle up to 10 files

const addDevice = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const { name, description, price } = req.body;
    const photos = req.files.map(file => file.path);
    try {
      const device = await Device.create({
        name,
        description,
        price,
        photos,
        user: req.user.id,
      });
      res.status(201).json(device);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

const updateDevice = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const { id } = req.params;
    const { name, description, price } = req.body;
    const updateFields = {
      name,
      description,
      price,
    };
    if (req.files.length > 0) {
      updateFields.photos = req.files.map(file => file.path);
    }
    try {
      const device = await Device.findByIdAndUpdate(id, updateFields, { new: true });
      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }
      res.json(device);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

const deleteDevice = async (req, res) => {
  const { id } = req.params;
  try {
    const device = await Device.findByIdAndDelete(id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.json({ message: 'Device deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDevices = async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', search = '', minPrice = 0, maxPrice = Number.MAX_SAFE_INTEGER } = req.query;

  const searchQuery = search
    ? { $or: [{ name: new RegExp(search, 'i') }, { description: new RegExp(search, 'i') }] }
    : {};

  const priceQuery = {
    price: { $gte: minPrice, $lte: maxPrice }
  };

  const query = { ...searchQuery, ...priceQuery };

  try {
    const devices = await Device.find(query)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Device.countDocuments(query);

    res.json({
      devices,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSoldDevices = async (req, res) => {
  try {
    const devices = await Device.find({ user: req.user.id, sold: true });
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDeviceById = async (req, res) => {
  const { id } = req.params;
  try {
    const device = await Device.findById(id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.json(device);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDevicesByUser = async (req, res) => {
  try {
    const devices = await Device.find({ user: req.user.id });
    if (!devices) {
      return res.status(404).json({ message: 'No devices found' });
    }
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDevicesByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const devices = await Device.find({ user: user._id });
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addDevice, updateDevice, deleteDevice, getDevices, getSoldDevices, getDeviceById, getDevicesByUsername, getDevicesByUser };
