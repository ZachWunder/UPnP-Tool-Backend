const express = require('express');
const router = express.Router();

const getDeviceServices = require("../resources/Services").getDeviceServices;

router.get('/:URL', async (req, res, next) => {
    const URL = req.params.URL;
    const deviceServices = await getDeviceServices(URL);
    console.log(deviceServices)

    res.json({
        deviceServices: deviceServices
    });

});

module.exports = router;
