const express = require('express');
const router = express.Router();

const getAllDeviceInfo = require("../resources/deviceInfo").getAllDeviceInfo;

router.get('/', async (req, res, next) => {
    //const devices = await getAllDeviceInfo();
    const devices = [{Name: "First Device", FirmwareVersion: "V3.0.2", UDN: "8762349"},
                      {Name: "Second Device", FirmwareVersion: "V3.0.2", UDN: "0234598"}]
    // SAVE TO CACHE

    res.json({
        deviceCount: devices.length,
        devices: devices
    });

});

module.exports = router;
