const express = require('express');
const router = express.Router();

const getAllDeviceInfo = require("../resources/deviceInfo").getAllDeviceInfo;

router.get('/', async (req, res, next) => {
    const devices = await getAllDeviceInfo();

    // SAVE TO CACHE

    res.json({
        deviceCount: devices.length,
        devices: devices
    });

});

module.exports = router;
