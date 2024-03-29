const paypal = require('paypal-rest-sdk'); // for the paypal sdk
const express = require('express');
require("dotenv").config();



paypal.configure({
    'mode': process.env.PAYPAL_MODE, //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_SECRET
  });



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
            "return_url": "http://e-portfolio-website.herokuapp.com/api/paypal/success",
            "cancel_url": "http://e-portfolio-website.herokuapp.com/api/paypal/cancel"
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
            
            res.redirect('http://e-portfolio-website.herokuapp.com/success')
            
    
        }
    });

    
}

const getCancelPage = async(req,res) => {
    res.redirect('http://e-portfolio-website.herokuapp.com/cancel');
}


module.exports = {
    getPay,
    getSuccessPage,
    getCancelPage,
};
