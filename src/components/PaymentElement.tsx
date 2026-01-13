import checkoutStyles from "./Checkout.module.css";
import styles from "./PaymentElement.module.css";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "@/components/Checkout";
import { useCallback, useEffect, useState } from "react";
import { useResumeContext } from "@/components/ResumeContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC!);

const PaymentElement = () => {
  const {
    resumeData,
    setResumeData,
    updateField,
    resetResumeData,
    saveResumeData,
    loadResumeData,
  } = useResumeContext();

  const [coupon, setCoupon] = useState<string>("");
  const [pdf, setPdf] = useState<string>("");

  // For Stripe
  const [clientSecret, setClientSecret] = useState<string>("");

  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    const res = await fetch("/api/payment_intents", {
      method: "POST",
    });
    const data = await res.json();
    setClientSecret(data.client_secret);
  }, []);

  const initPayment = async () => {
    if (clientSecret.length === 0) await fetchClientSecret();
  };

  const options = {
    clientSecret: clientSecret,
  };

  const checkDiscount = async (code: string) => {
    const response = await fetch("/api/check_discount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ discountCode: code, data: resumeData }),
    });
    if (response.ok) {
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      setPdf(url);
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (clientSecret) setClientSecret(clientSecret);
    if (localStorage.getItem("resumeData")) {
      setResumeData(JSON.parse(localStorage.getItem("resumeData") || "{}"));
    }
  }, []);
  return (
    <>
      {!clientSecret && (
        <>
          <button className={styles.greenbtn} onClick={initPayment}>
            Download PDF for 2.29 €
          </button>
          <div className={checkoutStyles.discount}>
            <input
              type="text"
              className={checkoutStyles.discountinput}
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder={"Free resume coupon"}
            />
            <button
              type={"button"}
              className={checkoutStyles.discountbtn}
              onClick={() => checkDiscount(coupon)}
            >
              Check coupon
            </button>
          </div>
        </>
      )}

      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <Checkout clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  );
};

export default PaymentElement;
