const express = require('express');
const paypalRouter = express.Router();


const paypalController = require('../controllers/paypal');

//@get page
paypalRouter.get('/', paypalController.getPayPage);


paypalRouter.post('/pay', paypalController.getPay);


paypalRouter.get('/success', paypalController.getSuccessPage);

paypalRouter.get('/cancel', paypalController.getCancelPage);

module.exports = paypalRouter;