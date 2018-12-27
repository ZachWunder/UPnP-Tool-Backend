const express = require('express');
const router = express.Router();

const getAllDeviceInfo = require("../resources/deviceInfo").getAllDeviceInfo;

router.get('/', async (req, res, next) => {
    try {
        const devices = await getAllDeviceInfo();
        console.log(devices)
        res.json({
            deviceCount: devices.length,
            devices: devices
        });
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
