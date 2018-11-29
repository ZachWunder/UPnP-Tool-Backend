const express = require('express');
const router = express.Router();

const getDeviceActions = require("../resources/deviceInfo").getDeviceActions;


/* GET home page. */
router.get('/:URL', async (req, res, next) => {
    const URL = req.params.URL;

    const deviceServices = await getDeviceServices(URL);

    // SAVE TO CACHE

    res.json({
        deviceServices: deviceServices
    });

});

module.exports = router;
