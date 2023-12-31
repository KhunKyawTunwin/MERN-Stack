import "./success.css";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { newRequest } from "../../api/url";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);

  return (
    <div className="success">
      Payment successful. You are being redirected to the orders page. Please do
      not close the Page !
    </div>
  );
};
export default Success;
