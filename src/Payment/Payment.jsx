import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Cheackout from "./Cheackout";
import { useParams } from "react-router-dom";

const stripePromice = loadStripe(import.meta.env.VITE_Payment_Gateway);

const Payment = () => {
  const id = useParams().id;
  return (
    <div>
      <div>
        <Elements stripe={stripePromice}>
          <Cheackout id={id} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
