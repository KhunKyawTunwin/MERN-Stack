import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { newRequest } from "../../api/url";
import { useParams } from "react-router-dom";
import { CheckoutForm } from "../../components";

const stripePromise = loadStripe(
  "pk_test_51MJAwaKh0CzTf5yO1o2B9kovAzPGvZ6BLpQO521TAZaqGHv2hUp0S8phmRRDxgUiq8goQfeQjv3VXOY99CU746le0051IBqnDa"
);
// const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id, amount } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const { data } = await newRequest.post(
          `/orders/create-payment-intent/${id}/${amount}`
        );
        return setClientSecret(data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm amount={amount} />
        </Elements>
      )}
    </div>
  );
};
export default Pay;
