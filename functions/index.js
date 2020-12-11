const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51HQx30A6EAxeVbIrBiirP5RAwoGXUGmNB4YQz726mFz4I1YSGBxH49pBWXkyDryFhkM7ZDpwVzdfpTF2DFQOqCVS00o8Z6VaRh')


//API 


// App config 
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());



//API Routes
app.get('/', (request, response) => response.status(200).send('hello world'));


app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log("Payment Request Rescieved BOOM!! for this total >>", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,// sub units of currency
        currency: "inr",
        payment_method_types: ['card'],
    });
    console.log(paymentIntent);
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
});


//Listen command
exports.api = functions.https.onRequest(app);


//http://localhost:5001/challenge-clone/us-central1/api