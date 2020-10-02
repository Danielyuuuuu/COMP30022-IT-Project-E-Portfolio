const paypal = require('paypal-rest-sdk'); // for the paypal sdk
const express = require('express');



paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AZVTtYQwzIEZq30fX3Dnb_NsG-5-OT8KqA7V6THH_0ZuxcWnYP5yHqbCaz_0WZFQHHbtiqIFsjoLkyUw',
    'client_secret': 'EEPSgCklExKHq4MOw9rpK9AgIpoNGdeboZ8dPxe25tRMfgTqvbpdWCqTys9L21dPQWfFZNUiqzrmAaXj'
  });



const getPayPage = async(req,res) =>{
    res.render('paypalPage');
}

const getPay = async(req,res) => {
    
    //const productName = req.body.name;
    const price = req.body.price;
    //const currency = req.body.currency;
    //const total = req.body.total;
    //const description = req.body.description;
    
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:8000/api/paypal/success",
            "cancel_url": "http://localhost:8000/api/paypal/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Mona Lisa's smile",
                    "sku": "item",
                    "price": price,
                    "currency": "AUD",
                    "quantity": 1
                },
                {
                    "name": "Anom Lisa's smile",
                    "sku": "item",
                    "price": price,
                    "currency": "AUD",
                    "quantity": 1
                },
                ]
            },
            "amount": {
                "currency": "AUD",
                "total": 2*price
            },
            "description": "Maybe the best chance for you to get this artcraft"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0; i < payment.links.length;i++){
                if(payment.links[i].rel === 'approval_url'){
                    res.json({ link:payment.links[i].href});
                    //res.redirect(payment.links[i].href);
                }
            }
        }
    });
}

const getSuccessPage = async(req,res) => {

    console.log(req.header);
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            //console.log(JSON.stringify(payment));
            res.send('Success');
        }
    });
}

const getCancelPage = async(req,res) => {
    res.send('Cancelled');
}


module.exports = {
    getPayPage,
    getPay,
    getSuccessPage,
    getCancelPage,
};