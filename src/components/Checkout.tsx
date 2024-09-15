"use client";

import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {FormEvent, useEffect, useRef, useState} from "react";
import {PaymentIntent} from "@stripe/stripe-js";
import {useResumeContext} from "@/components/ResumeContext";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cs, setCs] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const {resumeData} = useResumeContext();
  const [payBtnText, setPayBtnText] = useState<string>("Pay and download");

  const payref = useRef<HTMLButtonElement>(null);

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

  const download = async (paymentIntent: PaymentIntent) => {
    const response = await fetch("/api/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        paymentIntent_id: paymentIntent?.id,
        data: resumeData
      })
    });

    if (response.ok) {
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a);

      a.click();
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
            if (payref.current) {
              payref.current.className = styles.pay;
              setPayBtnText("🎉 Success, starting download...");
            }
            setMessage('Success! Payment received. Starting the download...');
            if (paymentIntent) download(paymentIntent);
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

  const handlePayAnimation = () => {
    if (payref.current) {
      payref.current.className = styles.paygray;
      setPayBtnText("Processing...");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement/>
      <div className={styles.paydiv}>
        <p>Grand total: 2.29 €</p>
        <button ref={payref} className={styles.pay}
                onClick={handlePayAnimation}>{payBtnText}
        </button>
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    </form>
  );
};

export default Checkout;