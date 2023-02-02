const express = require('express');

const premiumFeatureController = require('../controllers/premiumF');

const authenticatemiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/showLeaderBoard', authenticatemiddleware.authenticate,premiumFeatureController.getUserLeaderBoard);


module.exports = router;