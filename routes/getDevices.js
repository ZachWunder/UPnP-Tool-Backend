const express = require('express');
const router = express.Router();

const getAllDeviceInfo = require("../resources/deviceInfo").getAllDeviceInfo;

router.get('/', async (req, res, next) => {
    try {
        const devices = await getAllDeviceInfo();
        res.json({
            deviceCount: devices.length,
            devices: devices
        });
    } catch (e) {
        console.log(e);
    }

    /* const devices = [{Name: "First Device", FirmwareVersion: "V3.0.2", UDN: "8762349", URL: "http://192.169.1.104"},
                      {Name: "Second Device", FirmwareVersion: "V3.0.2", UDN: "0234598", URL: "http://192.169.1.104"}] */
    // SAVE TO CACHE



});

module.exports = router;
