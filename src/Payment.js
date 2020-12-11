import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import axios from './axios';
import { db } from './firebase';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        /* generate special stripe secret which allow us to charge a customer  */
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

    console.log("the SECRET is >>>", clientSecret);

    const handleSubmit = async (event) => {
        // do some fancy shit here from stripe...
        event.preventDefault();
        setProcessing(true);

        /* const payload = await stripe */
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                })

            setSucceeded(true);
            setError(null);
            setProcessing(false)

            dispatch({
                type: "EMPTY_BASKET"
            })

            history.replace('/orders')
        })
    }

    const handleChange = e => {
        // listen for the changes in the CardElements
        // and dispaly anyt error as the customer types their card details
        setDisabled(Event.empty);
        setError(Event.error ? Event.error.message : "")

    }

    return (
        <div className="payment">

            {/* Payment section - delivery address */}
            <div className="payment_container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items)</Link>
                </h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>#123 React-lane</p>
                        <p>New Delhi,India</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className="payment_items">
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/*  Payment section - payment method */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        {/* stripe magic will go on here */}

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={'₹'}
                                />
                                <button disabled={processing || disabled
                                    || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>


                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
