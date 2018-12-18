const express = require('express');
const router = express.Router();

const getDeviceInfo = require("../resources/deviceInfo").getDeviceInfo;

router.get('/:URL', async (req, res, next) => {
    try {
        const URL = req.params.URL;
        const deviceInfo = await getDeviceInfo(URL);
        console.log(deviceInfo)
        res.json(deviceInfo);
    } catch (e) {
        console.log(e);
    }

});

module.exports = router;
