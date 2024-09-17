"use client";

import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {FormEvent, useEffect, useRef, useState} from "react";
import {PaymentIntent} from "@stripe/stripe-js";
import {useResumeContext} from "@/components/ResumeContext";
import styles from "./Checkout.module.css";
import generateDiscountCode from "@/apiHelpers/generateDiscountCode";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cs, setCs] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const {resumeData} = useResumeContext();
  const [payBtnText, setPayBtnText] = useState<string>("Pay and download");
  const [pdf, setPdf] = useState<string>("");
  const [coupon, setCoupon] = useState<string>("");

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

      if (error.message) {
        setErrorMessage(error.message);
        if (payref.current) {
          payref.current.className = styles.payred;
          setPayBtnText(error.message);
          setTimeout(() => {
            payref.current!.className = styles.pay;
            setPayBtnText("Pay and download");
            setMessage("");
          }, 3000);
        }
      } else {
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
      setPdf(url);
      window.open(url, '_blank');

      /*const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a);

      a.click();
      document.body.removeChild(a);*/
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

  const checkDiscount = async (code: string) => {
    const response = await fetch("/api/check_discount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({discountCode: code, data: resumeData})
    });
    console.log(JSON.stringify({discountCode: code, data: resumeData}));
    if (response.ok) {
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      setPdf(url);
      window.open(url, '_blank');
    }
  };

  const log = async () => {
    console.log(await generateDiscountCode());
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement/>
      <div className={styles.paydiv}>
        <strong>Grand total: 2.29 €</strong>
        <button ref={payref} className={styles.pay}
                onClick={handlePayAnimation}>{payBtnText}
        </button>
        <div className={styles.discount}>
          <input type="text" className={styles.discountinput}
                 value={coupon}
                 onChange={(e) => setCoupon(e.target.value)}
                 placeholder={"Free resume coupon"}/>
          <button type={"button"}
                  className={styles.discountbtn}
                  onClick={() => checkDiscount(coupon)}>Check
            coupon
          </button>
        </div>
        {/*<button type={"button"}
                onClick={() => log()}>btn
        </button>*/}
        <p>* Make sure your browser allows opening PDF-file in a new tab!</p>
        <p>Some
          mobile browsers prevent the PDF from opening.</p>
        {pdf.length > 0 &&
          <a download={"resume.pdf"} href={pdf} target={"_blank"}>Link to your
            resume</a>}
      </div>
    </form>
  );
};

export default Checkout;