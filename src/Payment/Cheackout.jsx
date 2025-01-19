/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/Context";
import { toast, ToastContainer } from "react-toastify";

const Cheackout = ({ id }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const { data: sessionData = [] } = useQuery({
    queryKey: ["amount"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/onesessions/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      return data;
    },
  });
  const { data: stop = [] } = useQuery({
    queryKey: ["stop"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/stop/${id}`);
      return data;
    },
  });

  console.log(stop);
  console.log(id);

  const paymentInfo = {
    bookedsessionId: sessionData?._id,
    studentId: user?.email,
    studentName: user?.displayName,
    tutorEmail: sessionData?.tutorEmail,
  };

  console.log(sessionData);
  useEffect(() => {
    if (id === stop?.bookedsessionId) {
      toast.error("Already Booked", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      axios
        .post("http://localhost:5000/create-payment-intent", {
          price: sessionData?.registrationFee,
        })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
        });
    }
  }, [id, stop?.bookedsessionId, sessionData?.registrationFee]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
            // purchaseid: sessionData?._id,
          },
        },
      });
    if (confirmError) {
      console.log("[error]", confirmError);
    } else {
      console.log("[paymentIntent]", paymentIntent);
      try {
        const { data } = await axios.post(
          "http://localhost:5000/payment",
          paymentInfo
        );
        toast.success("Payment successful", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <ToastContainer />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Complete Your Payment
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Enter your payment details below to proceed.
        </p>
        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cheackout;
