/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../AuthProvider/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = ({ fees, id, university, subject, ScholarCategory }) => {
  // console.log(id);
  // console.log(fees);
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (fees > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: fees })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, fees]);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const payment = {
          name: user.displayName,
          email: user.email,
          price: fees,
          University_Name: university,
          Scholarship_Category: ScholarCategory,
          Subject_category: subject,
          transactionId: paymentIntent.id,
          date: new Date(),
          scholarshipId: id,
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log(res.data, "payment ok");
        if (res.data?.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment Successful !Thank you!",
            showConfirmButton: false,
            timer: 2000,
          });
          console.log(paymentIntent.id);
          navigate(`/applyForm/${paymentIntent.id}`);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="pt-10"
        options={{
          style: {
            base: {
              fontSize: "20px",
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
      />
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="h-16 w-full rounded-full border-2 border-sky-300 font-black text-sky-800 duration-300 dark:text-[#6CC2FB]"
        >
          Pay Now
        </button>
      </div>
      <p className="text-red-600 font-semibold text-xl">{error}</p>
      {transactionId && (
        <p className="text-green-600 font-semibold text-xl">
          {" "}
          Your transaction id: {transactionId}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
