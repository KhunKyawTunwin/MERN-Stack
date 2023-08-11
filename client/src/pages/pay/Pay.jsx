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

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );

        return setClientSecret(res.data.clientSecret);
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
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
export default Pay;
