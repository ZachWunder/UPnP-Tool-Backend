const express = require('express');
const router = express.Router();

const getServiceActions = require("../resources/Services").getServiceActions;

router.get('/:SCPDURL', async (req, res, next) => {
    const SCPDURL = req.params.SCPDURL;

    const actions = await getServiceActions(SCPDURL);
    console.log(actions);

    res.json({
        actions: actions
    });

});

module.exports = router;
