const express = require('express');
const paypalRouter = express.Router();


const paypalController = require('../controllers/paypal');

// @route POST getPay
// @description post payment request to paypal
// @access Public
paypalRouter.post('/pay', paypalController.getPay);

// @route GET getSuccessPage
// @description check and excute the payment 
// @access Public
paypalRouter.get('/success', paypalController.getSuccessPage);

// @route GET getCancelPage
// @description if the payment is cancelled 
// @access Public
paypalRouter.get('/cancel', paypalController.getCancelPage);

module.exports = paypalRouter;