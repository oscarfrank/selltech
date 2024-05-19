const express = require('express');
const router = express.Router();
const { addDevice, updateDevice, deleteDevice, getDevices, getSoldDevices, getDeviceById, getDevicesByUsername, getDevicesByUser } = require('../controllers/deviceController');
const { protect } = require('../middleware/authMiddleware');

router.post('/devices', protect, addDevice);
router.put('/devices/:id', protect, updateDevice);
router.delete('/devices/:id', protect, deleteDevice);
router.get('/devices', getDevices);
router.get('/devices/sold', protect, getSoldDevices);
router.get('/devices/:id', getDeviceById);
router.get('/shop/:username', getDevicesByUsername);
router.get('/user/devices', protect, getDevicesByUser);

module.exports = router;
