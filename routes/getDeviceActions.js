const express = require('express');
const router = express.Router();

const getDeviceActions = require("../resources/deviceInfo").getDeviceActions;

router.get('/:SCPDURL', async (req, res, next) => {
    const SCPDURL = req.params.SCPDURL;

    const deviceServices = await getDeviceServices(SCPDURL);

    // SAVE TO CACHE

    res.json({
        deviceServices: deviceServices
    });

});

module.exports = router;
