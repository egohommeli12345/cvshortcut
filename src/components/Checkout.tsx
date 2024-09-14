"use client";

import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {FormEvent, useEffect, useState} from "react";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cs, setCs] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");


  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const {
      error, paymentIntent
    } = await stripe.confirmPayment({
      elements: elements,
      confirmParams: {return_url: origin},
      redirect: "if_required"
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      if (error.message) setErrorMessage(error.message);
      else {
        setErrorMessage("error");
      }
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Handle any other payment status, like "requires_action" for 3D Secure, etc.
      setCs(paymentIntent.client_secret);
    }
  };


  useEffect(() => {
    if (!cs || !stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    /*const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );*/

    // Retrieve the PaymentIntent
    stripe
      .retrievePaymentIntent(cs)
      .then(({paymentIntent}) => {
        // Inspect the PaymentIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        switch (paymentIntent!.status) {
          case 'succeeded':
            setMessage('Success! Payment received.');
            break;

          case 'processing':
            setMessage("Payment processing. We'll update you when payment is received.");
            break;

          case 'requires_payment_method':
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage('Payment failed. Please try another payment method.');
            break;

          default:
            setMessage('Something went wrong.');
            break;
        }
      });
  }, [cs]);

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement/>
      <button>Pay and download</button>
      {(message.length > 0) && <div>{message}</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default Checkout;