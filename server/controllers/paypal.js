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

    var totalAmount = 0;

    req.body.map((item) =>{
        item["sku"] = "item";
        item["currency"] = "AUD";
        totalAmount += parseFloat(item["price"])*parseFloat(item["quantity"]);
    })


    const create_payment_json = {
        "intent": "sale",
        payer: {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:8000/api/paypal/success",
            "cancel_url": "http://localhost:8000/api/paypal/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": req.body
            },
            "amount": {
                "currency": "AUD",
                "total": totalAmount
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
            console.log("Get Payment Response")
            
            
            
            res.redirect('http://localhost:3000/success')
            
    
        }
    });

    
}

const getCancelPage = async(req,res) => {
    res.redirect('http://localhost:3000/cancel')
}


module.exports = {
    getPayPage,
    getPay,
    getSuccessPage,
    getCancelPage,
};
