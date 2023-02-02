const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchase');
const userAuthentication = require('../middlewares/auth');

router.get('/premiummembership', userAuthentication.authenticate, purchaseController.purchasePremium);

router.post('/updatetransctionstatus', userAuthentication.authenticate, purchaseController.updateTranscationStatus);

module.exports = router;